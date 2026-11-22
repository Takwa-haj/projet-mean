# INSTRUCTIONS DE DÉMARRAGE — Projet 4 TaskFlow

## LE PROBLÈME
Le dossier `frontend-src` contient uniquement les fichiers source.
Il faut créer le projet Angular 17 d'abord, puis y copier les fichiers.

---

## ÉTAPE 1 — Créer le projet Angular 17

Ouvrez un terminal PowerShell et exécutez :

```powershell
# Aller dans le dossier du projet
cd C:\Users\username\Downloads\projet4-mean-stack-final\projet-mean

# Créer le projet Angular 17 (répondre aux questions : No routing=Non, SCSS=Oui)
ng new frontend --style=scss --routing=true --standalone

# Entrer dans le dossier frontend
cd frontend
```

---

## ÉTAPE 2 — Copier les fichiers source

```powershell
# Depuis le dossier frontend/, copier les fichiers un par un

# 1. Modèles
copy ..\frontend-src\models.ts src\app\models\projet.model.ts

# 2. Services (créer les dossiers d'abord)
mkdir src\app\services
copy ..\frontend-src\projet.service.ts src\app\services\projet.service.ts
copy ..\frontend-src\tache.service.ts src\app\services\tache.service.ts

# 3. Composants
mkdir src\app\pages\projets-list
copy ..\frontend-src\projets-list.component.ts src\app\pages\projets-list\projets-list.component.ts
copy ..\frontend-src\projets-list.component.html src\app\pages\projets-list\projets-list.component.html

mkdir src\app\pages\projet-form
copy ..\frontend-src\projet-form.component.ts src\app\pages\projet-form\projet-form.component.ts
copy ..\frontend-src\projet-form.component.html src\app\pages\projet-form\projet-form.component.html

mkdir src\app\pages\projet-detail
copy ..\frontend-src\projet-detail.component.ts src\app\pages\projet-detail\projet-detail.component.ts
copy ..\frontend-src\projet-detail.component.html src\app\pages\projet-detail\projet-detail.component.html

# 4. Routes
copy ..\frontend-src\app.routes.ts src\app\app.routes.ts

# 5. Styles globaux
copy ..\frontend-src\styles.scss src\styles.scss

# 6. Environment
mkdir src\environments
copy ..\frontend-src\environment.ts src\environments\environment.ts
```

---

## ÉTAPE 3 — Configurer app.config.ts

Remplacer le contenu de `src\app\app.config.ts` par :

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

---

## ÉTAPE 4 — Configurer app.component.ts

Remplacer le contenu de `src\app\app.component.ts` par :

```typescript
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
export class AppComponent {
  title = 'frontend';
}
```

---

## ÉTAPE 5 — Démarrer le frontend

```powershell
ng serve
# → http://localhost:4200
```

---

## DÉMARRER LE BACKEND

Dans un autre terminal :

```powershell
cd C:\Users\username\Downloads\projet4-mean-stack-final\projet-mean\backend
npm install
node seed.js
npm run dev
# → http://localhost:3000
```
