import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a routerLink="/projets" class="navbar-brand">TaskFlow</a>
      <div class="navbar-links">
        <a routerLink="/projets" routerLinkActive="active">Projets</a>
      </div>
    </nav>
    <router-outlet />
  `,
})
export class AppComponent { title = 'frontend'; }
