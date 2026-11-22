# 🗂️ TaskFlow — Project & Task Management

<p align="center">
  <strong>A Full-Stack Project Management Application built with the MEAN Stack</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
</p>

---

## 📋 Overview

**TaskFlow** is a full-stack web application designed to simplify project and task management. It allows users to create and manage projects, organize tasks, track progress, and monitor deadlines through an interactive Kanban board.

This application was developed as part of the **MEAN Stack module at Polytechnique sousse**.

### ✨ Key Features

- **Project Management:** Create, view, update, and delete projects.
- **Task Management:** Complete CRUD operations for project-related tasks.
- **Interactive Kanban Board:** Organize tasks into To Do, In Progress, and Completed columns.
- **Progress Tracking:** Automatically calculate project completion percentages.
- **Search & Filtering:** Search projects and filter tasks by status, project, or priority.
- **Priority Management:** Four priority levels (Low, Medium, High, Critical).
- **Deadline Management:** Set and track task due dates.
- **Cascade Deletion:** Automatically delete associated tasks when a project is removed.
- **Error Handling:** Backend and frontend error management.

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Frontend | Angular 17 |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| API | REST API |
| HTTP Communication | Angular HttpClient |
| Forms | Angular Reactive Forms |
| API Testing | Postman / Thunder Client |
| Development Tools | Angular CLI, Nodemon |

---

## 🏗️ Project Architecture

The application follows a modular architecture separating the frontend and backend.

```text
projet-mean/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── projetController.js
│   │   └── tacheController.js
│   │
│   ├── models/
│   │   ├── Projet.js
│   │   └── Tache.js
│   │
│   ├── routes/
│   │   ├── projetRoutes.js
│   │   └── tacheRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── .env
│   ├── app.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   └── src/
│       └── app/
│           ├── models/
│           │   └── projet.model.ts
│           │
│           ├── services/
│           │   ├── projet.service.ts
│           │   └── tache.service.ts
│           │
│           ├── pages/
│           │   ├── projets-list/
│           │   ├── projet-form/
│           │   └── projet-detail/
│           │
│           ├── app.routes.ts
│           ├── app.config.ts
│           └── app.component.ts
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account
- [Angular CLI](https://angular.dev/tools/cli)

Install Angular CLI:

```bash
npm install -g @angular/cli
```

### 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/projet-mean.git
cd projet-mean
```

### 3. Backend Configuration

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/gestion_projets
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGO_URI` with your database connection string.

Start the backend server:

```bash
npm run dev
```

Or:

```bash
npm start
```

Load demonstration data (optional):

```bash
node seed.js
```

**Backend API:** `http://localhost:3000`

### 4. Frontend Configuration

Open another terminal:

```bash
cd frontend
npm install
ng serve
```

**Frontend Application:** `http://localhost:4200`

---

## 🔌 REST API Documentation

**Base URL:** `http://localhost:3000/api`

### 📁 Projects Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projets` | Retrieve all projects with statistics |
| GET | `/projets/:id` | Retrieve project details and associated tasks |
| POST | `/projets` | Create a new project |
| PUT | `/projets/:id` | Update an existing project |
| DELETE | `/projets/:id` | Delete a project and its associated tasks |

**Example: Create a Project**

```json
{
  "nom": "E-commerce Website",
  "description": "Online shopping platform",
  "dateDebut": "2024-01-15",
  "dateFin": "2024-06-30",
  "statut": "actif",
  "couleur": "#6366f1"
}
```

### ✅ Tasks Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/taches` | Retrieve all tasks |
| GET | `/taches?projet=ID` | Filter tasks by project |
| GET | `/taches?statut=...` | Filter tasks by status |
| GET | `/taches/:id` | Retrieve task details |
| POST | `/taches` | Create a new task |
| PUT | `/taches/:id` | Update an existing task |
| PATCH | `/taches/:id/statut` | Update task status |
| DELETE | `/taches/:id` | Delete a task |

**Example: Create a Task**

```json
{
  "titre": "API Development",
  "description": "Implement REST API routes",
  "statut": "en cours",
  "priorite": "haute",
  "projet": "663abc123def456789012345",
  "dateEcheance": "2024-05-01"
}
```

**Example: Update Task Status**

```json
{
  "statut": "terminé"
}
```

### 📌 Accepted Values

| Field | Accepted Values |
|---|---|
| Project Status | `actif`, `en_pause`, `terminé`, `annulé` |
| Task Status | `à faire`, `en cours`, `terminé` |
| Priority | `basse`, `moyenne`, `haute`, `critique` |

---

## 🧪 API Testing

The REST API can be tested using **Postman** or **Thunder Client**.

### Successful Test Scenarios

| # | Request | Expected Result |
|---|---|---|
| 1 | `GET /api/health` | 200 OK |
| 2 | `POST /api/projets` | 201 Created |
| 3 | `GET /api/projets` | 200 OK |
| 4 | `GET /api/projets/:id` | 200 OK |
| 5 | `PUT /api/projets/:id` | 200 OK |
| 6 | `POST /api/taches` | 201 Created |
| 7 | `PATCH /api/taches/:id/statut` | 200 OK |
| 8 | `DELETE /api/taches/:id` | 200 OK |
| 9 | `DELETE /api/projets/:id` | 200 OK |

### Error Handling Tests

| Scenario | Expected Result |
|---|---|
| Invalid project ID | 400 Bad Request |
| Non-existing project | 404 Not Found |
| Create project without name | 400 Bad Request |
| Create task with non-existing project | 404 Not Found |
| Invalid task status | 400 Bad Request |

---

## 🗄️ Database Models

### Project Model — `Projet`

| Field | Type | Description |
|---|---|---|
| nom | String | Project name (required) |
| description | String | Project description |
| dateDebut | Date | Start date |
| dateFin | Date | End date |
| statut | String | Project status |
| couleur | String | Project color (HEX) |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |

### Task Model — `Tache`

| Field | Type | Description |
|---|---|---|
| titre | String | Task title (required) |
| description | String | Task description |
| statut | String | Task status |
| priorite | String | Task priority |
| projet | ObjectId | Reference to Projet |
| dateEcheance | Date | Task deadline |
| ordre | Number | Task ordering |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |

---

## 🖥️ Angular Application

### Main Pages

| Component | Route | Description |
|---|---|---|
| ProjetListComponent | `/projets` | Project listing, search, and filtering |
| ProjetFormComponent | `/projets/nouveau` | Create a project |
| ProjetFormComponent | `/projets/:id/modifier` | Edit a project |
| ProjetDetailComponent | `/projets/:id` | Project details and Kanban board |

### Angular Services

- **ProjetService:** Handles HTTP requests and project CRUD operations.
- **TacheService:** Handles HTTP requests and task CRUD operations.

### Angular Features

- Standalone components
- Lazy-loaded routing
- Reactive Forms and form validation
- HttpClient for REST API communication
- Error handling
- Dynamic project and task rendering

---

## ⭐ Additional Features & Improvements

- Automatic project progress calculation.
- Interactive three-column Kanban board.
- Four task priority levels.
- Task deadline management.
- MongoDB `populate()` for related project information.
- Cascade deletion of project-related tasks.
- Dedicated PATCH endpoint for task status updates.
- Combined filters (project, status, priority).
- Custom project color selector.

---

## 👩‍💻 Author

**Takwa HAJ**

Engineering Student — Data Science & Artificial Intelligence

**Institution:** Polytech Monastir  
**Academic Year:** 2024–2025  
**Module:** MEAN Stack  
**Project:** 4 — TaskFlow

---

## 📄 License

This project was developed for educational purposes as part of the MEAN Stack module at Polytech Monastir.

