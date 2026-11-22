// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/projets', pathMatch: 'full' },
  {
    path: 'projets',
    loadComponent: () =>
      import('./pages/projets-list/projets-list.component').then((m) => m.ProjetListComponent),
  },
  {
    path: 'projets/nouveau',
    loadComponent: () =>
      import('./pages/projet-form/projet-form.component').then((m) => m.ProjetFormComponent),
  },
  {
    path: 'projets/:id',
    loadComponent: () =>
      import('./pages/projet-detail/projet-detail.component').then((m) => m.ProjetDetailComponent),
  },
  {
    path: 'projets/:id/modifier',
    loadComponent: () =>
      import('./pages/projet-form/projet-form.component').then((m) => m.ProjetFormComponent),
  },
  { path: '**', redirectTo: '/projets' },
];

// ─── src/app/app.config.ts ────────────────────────────────────────────────────
// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
//
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideHttpClient()],
// };
