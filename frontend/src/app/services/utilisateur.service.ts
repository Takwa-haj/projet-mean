import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Utilisateur {
  _id?: string;
  nom: string;
  email: string;
  role: 'admin' | 'chef_projet' | 'developpeur' | 'testeur';
  actif?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  [x: string]: any;
  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(u: Partial<Utilisateur>): Observable<any> {
    return this.http.post(this.apiUrl, u);
  }

  update(id: string, u: Partial<Utilisateur>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, u);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Many-to-Many : ajouter un utilisateur à un projet
  ajouterAuProjet(userId: string, projetId: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/projets/${projetId}`, { role });
  }

  // Many-to-Many : retirer un utilisateur d'un projet
  retirerDuProjet(userId: string, projetId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/projets/${projetId}`);
  }
}
