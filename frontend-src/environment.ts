// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// ──────────────────────────────────────────────────────────────────────────────
// src/environments/environment.prod.ts
// export const environment = {
//   production: true,
//   apiUrl: 'https://votre-domaine.com/api',
// };

// ──────────────────────────────────────────────────────────────────────────────
// src/app/app.component.ts
// import { Component } from '@angular/core';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink, RouterLinkActive],
//   template: `
//     <nav class="navbar">
//       <a routerLink="/projets" class="navbar-brand">🗂 TaskFlow</a>
//       <div class="navbar-links">
//         <a routerLink="/projets" routerLinkActive="active">Projets</a>
//       </div>
//     </nav>
//     <router-outlet />
//   `,
// })
// export class AppComponent {}

// ──────────────────────────────────────────────────────────────────────────────
// src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// bootstrapApplication(AppComponent, appConfig).catch(console.error);

// ──────────────────────────────────────────────────────────────────────────────
// src/app/app.config.ts
// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
//
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//   ],
// };
