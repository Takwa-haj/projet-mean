// app.js — Point d'entrée du serveur Express
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connexion à MongoDB
connectDB();

const app = express();

// ─── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:4200' })); // Autoriser Angular
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/projets', require('./routes/projetRoutes'));
app.use('/api/taches', require('./routes/tacheRoutes'));
app.use('/api/utilisateurs', require('./routes/utilisateurRoutes'));


// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API opérationnelle ', timestamp: new Date().toISOString() });
});

// Route inconnue
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route introuvable : ${req.originalUrl}` });
});

// ─── Middleware d'erreur global (doit être en dernier) ─────────────────────────
app.use(errorHandler);

// ─── Démarrage ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📦 Environnement : ${process.env.NODE_ENV}`);
});
