// src/app/services/tache.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Tache } from '../models/projet.model';
import { environment } from '../../environments/environment';

export interface TacheFilter {
  projet?: string;
  statut?: string;
  priorite?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = `${environment.apiUrl}/taches`;

  constructor(private http: HttpClient) {}

  getAllTaches(filters?: TacheFilter): Observable<ApiResponse<Tache[]>> {
    let params = new HttpParams();
    if (filters?.projet) params = params.set('projet', filters.projet);
    if (filters?.statut) params = params.set('statut', filters.statut);
    if (filters?.priorite) params = params.set('priorite', filters.priorite);
    return this.http.get<ApiResponse<Tache[]>>(this.apiUrl, { params });
  }

  getTacheById(id: string): Observable<ApiResponse<Tache>> {
    return this.http.get<ApiResponse<Tache>>(`${this.apiUrl}/${id}`);
  }

  createTache(tache: Partial<Tache>): Observable<ApiResponse<Tache>> {
    return this.http.post<ApiResponse<Tache>>(this.apiUrl, tache);
  }

  updateTache(id: string, tache: Partial<Tache>): Observable<ApiResponse<Tache>> {
    return this.http.put<ApiResponse<Tache>>(`${this.apiUrl}/${id}`, tache);
  }

  updateStatut(id: string, statut: string): Observable<ApiResponse<Tache>> {
    return this.http.patch<ApiResponse<Tache>>(`${this.apiUrl}/${id}/statut`, { statut });
  }

  deleteTache(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
