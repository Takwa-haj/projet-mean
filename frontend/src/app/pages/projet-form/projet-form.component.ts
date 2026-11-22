// src/app/pages/projet-form/projet-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';

@Component({
  selector: 'app-projet-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './projet-form.component.html',
  styleUrls: ['./projet-form.component.scss'],
})
export class ProjetFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  projetId: string | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  couleurs = [
    '#6366f1', '#ec4899', '#f59e0b', '#10b981',
    '#3b82f6', '#ef4444', '#8b5cf6', '#14b8a6',
  ];

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projetId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.projetId && this.router.url.includes('modifier');

    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      dateDebut: [new Date().toISOString().split('T')[0]],
      dateFin: [null],
      statut: ['actif', Validators.required],
      couleur: ['#6366f1'],
    });

    if (this.isEditMode && this.projetId) {
      this.chargerProjet();
    }
  }

  chargerProjet(): void {
    this.isLoading = true;
    this.projetService.getProjetById(this.projetId!).subscribe({
      next: (res) => {
        const p = res.data!;
        this.form.patchValue({
          nom: p.nom,
          description: p.description || '',
          dateDebut: p.dateDebut ? new Date(p.dateDebut).toISOString().split('T')[0] : '',
          dateFin: p.dateFin ? new Date(p.dateFin).toISOString().split('T')[0] : null,
          statut: p.statut,
          couleur: p.couleur || '#6366f1',
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le projet.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const data = this.form.value;

    const action = this.isEditMode
      ? this.projetService.updateProjet(this.projetId!, data)
      : this.projetService.createProjet(data);

    action.subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Opération réussie';
        setTimeout(() => this.router.navigate(['/projets']), 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.isLoading = false;
      },
    });
  }

  get nomCtrl() { return this.form.get('nom')!; }
  get descCtrl() { return this.form.get('description')!; }
}
