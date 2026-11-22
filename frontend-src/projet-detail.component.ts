// src/app/pages/projet-detail/projet-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { TacheService } from '../../services/tache.service';
import { Projet, Tache } from '../../models/projet.model';

@Component({
  selector: 'app-projet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './projet-detail.component.html',
  styleUrls: ['./projet-detail.component.scss'],
})
export class ProjetDetailComponent implements OnInit {
  projet?: Projet;
  taches: Tache[] = [];
  tachesFiltrees: Tache[] = [];
  isLoading = true;
  errorMessage = '';

  // Filtre tâches
  filtreStatut = '';

  // Formulaire tâche
  tacheForm!: FormGroup;
  isFormVisible = false;
  isTacheEditMode = false;
  tacheEditId: string | null = null;
  isTacheSaving = false;

  statutOptions = ['à faire', 'en cours', 'terminé'];
  prioriteOptions = ['basse', 'moyenne', 'haute', 'critique'];

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private tacheService: TacheService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.chargerProjet(id);
  }

  initForm(): void {
    this.tacheForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', Validators.maxLength(1000)],
      statut: ['à faire', Validators.required],
      priorite: ['moyenne', Validators.required],
      dateEcheance: [null],
    });
  }

  chargerProjet(id: string): void {
    this.isLoading = true;
    this.projetService.getProjetById(id).subscribe({
      next: (res) => {
        this.projet = res.data!;
        this.taches = (res.data as any).taches || [];
        this.appliquerFiltre();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le projet.';
        this.isLoading = false;
      },
    });
  }

  appliquerFiltre(): void {
    this.tachesFiltrees = this.filtreStatut
      ? this.taches.filter((t) => t.statut === this.filtreStatut)
      : [...this.taches];
  }

  // ─── Kanban helpers ────────────────────────────────────────────────────────
  tachesParStatut(statut: string): Tache[] {
    return this.taches.filter((t) => t.statut === statut);
  }

  changerStatut(tache: Tache, nouveauStatut: string): void {
    this.tacheService.updateStatut(tache._id!, nouveauStatut).subscribe({
      next: (res) => {
        tache.statut = res.data!.statut;
        this.appliquerFiltre();
        this.recalculerStats();
      },
      error: () => alert('Erreur lors du changement de statut'),
    });
  }

  recalculerStats(): void {
    if (!this.projet?.stats) return;
    const total = this.taches.length;
    const terminees = this.taches.filter((t) => t.statut === 'terminé').length;
    this.projet.stats = { total, terminees, avancement: total > 0 ? Math.round((terminees / total) * 100) : 0 };
  }

  // ─── Formulaire tâche ──────────────────────────────────────────────────────
  ouvrirFormulaire(tache?: Tache): void {
    this.isFormVisible = true;
    if (tache) {
      this.isTacheEditMode = true;
      this.tacheEditId = tache._id!;
      this.tacheForm.patchValue({
        titre: tache.titre,
        description: tache.description || '',
        statut: tache.statut,
        priorite: tache.priorite,
        dateEcheance: tache.dateEcheance ? new Date(tache.dateEcheance).toISOString().split('T')[0] : null,
      });
    } else {
      this.isTacheEditMode = false;
      this.tacheEditId = null;
      this.tacheForm.reset({ statut: 'à faire', priorite: 'moyenne' });
    }
  }

  fermerFormulaire(): void {
    this.isFormVisible = false;
    this.tacheForm.reset({ statut: 'à faire', priorite: 'moyenne' });
  }

  sauvegarderTache(): void {
    if (this.tacheForm.invalid) { this.tacheForm.markAllAsTouched(); return; }
    this.isTacheSaving = true;

    const data = { ...this.tacheForm.value, projet: this.projet!._id };

    const action = this.isTacheEditMode
      ? this.tacheService.updateTache(this.tacheEditId!, data)
      : this.tacheService.createTache(data);

    action.subscribe({
      next: (res) => {
        if (this.isTacheEditMode) {
          const idx = this.taches.findIndex((t) => t._id === this.tacheEditId);
          if (idx !== -1) this.taches[idx] = res.data!;
        } else {
          this.taches.push(res.data!);
        }
        this.appliquerFiltre();
        this.recalculerStats();
        this.fermerFormulaire();
        this.isTacheSaving = false;
      },
      error: (err) => {
        alert(err.error?.message || 'Erreur lors de la sauvegarde');
        this.isTacheSaving = false;
      },
    });
  }

  supprimerTache(id: string): void {
    if (!confirm('Supprimer cette tâche ?')) return;
    this.tacheService.deleteTache(id).subscribe({
      next: () => {
        this.taches = this.taches.filter((t) => t._id !== id);
        this.appliquerFiltre();
        this.recalculerStats();
      },
      error: () => alert('Erreur lors de la suppression'),
    });
  }

  getPrioriteClass(p: string): string {
    return { basse: 'prio-basse', moyenne: 'prio-moyenne', haute: 'prio-haute', critique: 'prio-critique' }[p] || '';
  }

  get titreCtrl() { return this.tacheForm.get('titre')!; }
}
