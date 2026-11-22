// src/app/services/projet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Projet } from '../models/projet.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  private apiUrl = `${environment.apiUrl}/projets`;

  constructor(private http: HttpClient) {}

  getAllProjets(): Observable<ApiResponse<Projet[]>> {
    return this.http.get<ApiResponse<Projet[]>>(this.apiUrl);
  }

  getProjetById(id: string): Observable<ApiResponse<Projet>> {
    return this.http.get<ApiResponse<Projet>>(`${this.apiUrl}/${id}`);
  }

  createProjet(projet: Partial<Projet>): Observable<ApiResponse<Projet>> {
    return this.http.post<ApiResponse<Projet>>(this.apiUrl, projet);
  }

  updateProjet(id: string, projet: Partial<Projet>): Observable<ApiResponse<Projet>> {
    return this.http.put<ApiResponse<Projet>>(`${this.apiUrl}/${id}`, projet);
  }

  deleteProjet(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
  getMembres(projetId: string): Observable<any> {
  return this.http.get(`${environment.apiUrl}/utilisateurs?projet=${projetId}`);
}
}
