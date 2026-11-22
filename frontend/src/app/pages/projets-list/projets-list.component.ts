// src/app/pages/projets-list/projets-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { Projet } from '../../models/projet.model';

@Component({
  selector: 'app-projets-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projets-list.component.html',
  styleUrls: ['./projets-list.component.scss'],
})
export class ProjetListComponent implements OnInit {
  projets: Projet[] = [];
  projetsFiltres: Projet[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  filtreStatut = '';

  statutOptions = ['actif', 'en_pause', 'terminé', 'annulé'];

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.chargerProjets();
  }

  chargerProjets(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.projetService.getAllProjets().subscribe({
      next: (res) => {
        this.projets = res.data || [];
        this.appliquerFiltres();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les projets. Vérifiez que le serveur est démarré.';
        this.isLoading = false;
      },
    });
  }

  appliquerFiltres(): void {
    this.projetsFiltres = this.projets.filter((p) => {
      const matchSearch =
        !this.searchTerm ||
        p.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatut = !this.filtreStatut || p.statut === this.filtreStatut;
      return matchSearch && matchStatut;
    });
  }

  supprimerProjet(id: string, nom: string): void {
    if (!confirm(`Supprimer le projet "${nom}" et toutes ses tâches ?`)) return;
    this.projetService.deleteProjet(id).subscribe({
      next: () => {
        this.projets = this.projets.filter((p) => p._id !== id);
        this.appliquerFiltres();
      },
      error: () => alert('Erreur lors de la suppression'),
    });
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      actif: 'badge-actif',
      en_pause: 'badge-pause',
      terminé: 'badge-termine',
      annulé: 'badge-annule',
    };
    return map[statut] || '';
  }

  trackById(_: number, p: Projet): string {
    return p._id!;
  }
}
