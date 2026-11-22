# 🗂 TaskFlow — Gestion de Projets et Tâches
### Projet 4 · MEAN Stack · Angular 17 / Node.js / Express / MongoDB

---

## 📋 Présentation

Application web full stack de suivi de projets et de tâches, réalisée dans le cadre du module MEAN Stack à **Polytech Monastir**.

**Fonctionnalités principales :**
- CRUD complet des projets (créer, lire, modifier, supprimer)
- CRUD complet des tâches rattachées à un projet
- Tableau Kanban interactif (à faire / en cours / terminé)
- Calcul automatique du pourcentage d'avancement par projet
- Filtrage par statut et recherche textuelle
- Gestion des priorités (basse / moyenne / haute / critique)
- Dates d'échéance par tâche
- Suppression en cascade (projet → tâches liées)
- Gestion des erreurs côté backend et frontend

---

## 🏗 Architecture du projet

```
projet-mean/
├── backend/
│   ├── config/
│   │   └── db.js              ← Connexion MongoDB
│   ├── controllers/
│   │   ├── projetController.js
│   │   └── tacheController.js
│   ├── models/
│   │   ├── Projet.js          ← Modèle Mongoose
│   │   └── Tache.js           ← Modèle Mongoose
│   ├── routes/
│   │   ├── projetRoutes.js
│   │   └── tacheRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env
│   ├── app.js                 ← Point d'entrée Express
│   ├── seed.js                ← Script de démonstration
│   └── package.json
│
├── frontend/                  ← Projet Angular 17
│   └── src/
│       └── app/
│           ├── models/
│           │   └── projet.model.ts
│           ├── services/
│           │   ├── projet.service.ts
│           │   └── tache.service.ts
│           ├── pages/
│           │   ├── projets-list/
│           │   ├── projet-form/
│           │   └── projet-detail/
│           ├── app.routes.ts
│           ├── app.config.ts
│           └── app.component.ts
│
└── README.md
```

---

## 🚀 Installation et démarrage

### Prérequis
- Node.js ≥ 18
- MongoDB local ou MongoDB Atlas
- Angular CLI : `npm install -g @angular/cli`

---

### Backend

```bash
cd backend
npm install
```

Créer le fichier `.env` :
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/gestion_projets
NODE_ENV=development
```

Démarrer le serveur :
```bash
npm run dev         # avec nodemon (développement)
npm start           # sans nodemon
```

Charger les données de démonstration :
```bash
node seed.js
```

✅ API disponible sur : `http://localhost:3000`

---

### Frontend

```bash
cd frontend
npm install
ng serve
```

✅ Application disponible sur : `http://localhost:4200`

---

## 🔌 API REST — Documentation

### Base URL : `http://localhost:3000/api`

---

### 📁 Projets `/api/projets`

| Méthode | Route              | Description                         |
|---------|-------------------|-------------------------------------|
| GET     | `/api/projets`     | Liste tous les projets + stats       |
| GET     | `/api/projets/:id` | Détail d'un projet + tâches liées   |
| POST    | `/api/projets`     | Créer un projet                     |
| PUT     | `/api/projets/:id` | Modifier un projet                  |
| DELETE  | `/api/projets/:id` | Supprimer projet + tâches en cascade|

**Corps POST/PUT :**
```json
{
  "nom": "Site E-commerce",
  "description": "Boutique en ligne",
  "dateDebut": "2024-01-15",
  "dateFin": "2024-06-30",
  "statut": "actif",
  "couleur": "#6366f1"
}
```

---

### ✅ Tâches `/api/taches`

| Méthode | Route                    | Description                     |
|---------|--------------------------|---------------------------------|
| GET     | `/api/taches`             | Liste toutes les tâches         |
| GET     | `/api/taches?projet=ID`  | Filtre par projet               |
| GET     | `/api/taches?statut=...` | Filtre par statut               |
| GET     | `/api/taches/:id`         | Détail d'une tâche              |
| POST    | `/api/taches`             | Créer une tâche                 |
| PUT     | `/api/taches/:id`         | Modifier une tâche              |
| PATCH   | `/api/taches/:id/statut`  | Changer uniquement le statut   |
| DELETE  | `/api/taches/:id`         | Supprimer une tâche             |

**Corps POST/PUT :**
```json
{
  "titre": "Développement API",
  "description": "Créer les routes REST",
  "statut": "en cours",
  "priorite": "haute",
  "projet": "663abc123def456789012345",
  "dateEcheance": "2024-05-01"
}
```

**Corps PATCH /statut :**
```json
{ "statut": "terminé" }
```

---

### Valeurs acceptées

| Champ         | Valeurs                                    |
|---------------|--------------------------------------------|
| `statut` (projet) | `actif` `en_pause` `terminé` `annulé`  |
| `statut` (tâche)  | `à faire` `en cours` `terminé`         |
| `priorite`    | `basse` `moyenne` `haute` `critique`       |

---

## 🧪 Tests API (Postman / Thunder Client)

### Exemples de tests à réaliser :

#### ✅ Cas nominaux
1. `GET /api/health` → Vérifier que l'API est opérationnelle
2. `POST /api/projets` → Créer un nouveau projet
3. `GET /api/projets` → Lister tous les projets
4. `GET /api/projets/:id` → Voir le détail avec tâches
5. `PUT /api/projets/:id` → Modifier le nom du projet
6. `POST /api/taches` → Créer une tâche sur un projet existant
7. `PATCH /api/taches/:id/statut` → Changer le statut à "terminé"
8. `DELETE /api/taches/:id` → Supprimer une tâche
9. `DELETE /api/projets/:id` → Supprimer un projet + cascade

#### ❌ Cas d'erreur à tester
| Test                        | Résultat attendu                          |
|-----------------------------|-------------------------------------------|
| `GET /api/projets/invalid_id`   | `400` — Identifiant invalide            |
| `GET /api/projets/000000000000000000000000` | `404` — Projet introuvable |
| `POST /api/projets` sans `nom`  | `400` — Le nom est obligatoire          |
| `POST /api/taches` avec `projet` inexistant | `404` — Projet introuvable |
| `PATCH /api/taches/:id/statut` avec valeur invalide | `400` — Statut invalide |

---

## 📐 Modèles de données MongoDB

### Projet
```js
{
  nom:         String (required, 3–100 chars)
  description: String (max 500 chars)
  dateDebut:   Date
  dateFin:     Date | null
  statut:      'actif' | 'en_pause' | 'terminé' | 'annulé'
  couleur:     String (hex color)
  createdAt:   Date (auto)
  updatedAt:   Date (auto)
}
```

### Tache
```js
{
  titre:        String (required, 3–200 chars)
  description:  String (max 1000 chars)
  statut:       'à faire' | 'en cours' | 'terminé'
  priorite:     'basse' | 'moyenne' | 'haute' | 'critique'
  projet:       ObjectId (ref: Projet, required)
  dateEcheance: Date | null
  ordre:        Number
  createdAt:    Date (auto)
  updatedAt:    Date (auto)
}
```

---

## 🎯 Fonctionnalités Angular 17

| Page / Composant    | Route                    | Description                        |
|---------------------|--------------------------|------------------------------------|
| ProjetListComponent  | `/projets`              | Liste + recherche + filtre statut  |
| ProjetFormComponent  | `/projets/nouveau`      | Formulaire réactif création        |
| ProjetFormComponent  | `/projets/:id/modifier` | Formulaire réactif modification    |
| ProjetDetailComponent| `/projets/:id`          | Kanban + gestion tâches en modal   |

**Services Angular :**
- `ProjetService` — Appels HTTP CRUD projets
- `TacheService` — Appels HTTP CRUD tâches

**Formulaires :** Reactive Forms avec validations
**Routing :** Lazy loading standalone components
**HTTP :** `HttpClient` avec gestion d'erreurs

---

## 🏆 Bonus implémentés

- ✅ Calcul du pourcentage d'avancement par projet
- ✅ Interface Kanban simplifiée (3 colonnes)
- ✅ Priorités de tâches (4 niveaux)
- ✅ Tri par date d'échéance (via champ dateEcheance)
- ✅ populate() pour récupérer les tâches avec les infos projet
- ✅ Suppression en cascade projet → tâches
- ✅ Route PATCH dédiée pour changer le statut d'une tâche
- ✅ Filtres combinés sur les tâches (projet + statut + priorité)
- ✅ Sélecteur de couleur par projet

---

## 👤 Auteur

Projet réalisé dans le cadre du module MEAN Stack  
**Polytech Monastir** — Année 2024/2025
