// src/app/models/projet.model.ts
export interface Projet {
  _id?: string;
  nom: string;
  description?: string;
  dateDebut?: Date | string;
  dateFin?: Date | string | null;
  statut: 'actif' | 'en_pause' | 'terminé' | 'annulé';
  couleur?: string;
  stats?: {
    total: number;
    terminees: number;
    avancement: number;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Tache {
  _id?: string;
  titre: string;
  description?: string;
  statut: 'à faire' | 'en cours' | 'terminé';
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
  projet: string | Projet;
  dateEcheance?: Date | string | null;
  ordre?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  error?: string;
}
