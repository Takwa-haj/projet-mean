// models/Tache.js
const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre de la tâche est obligatoire'],
      trim: true,
      minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères'],
      default: '',
    },
    statut: {
      type: String,
      enum: ['à faire', 'en cours', 'terminé'],
      default: 'à faire',
    },
    priorite: {
      type: String,
      enum: ['basse', 'moyenne', 'haute', 'critique'],
      default: 'moyenne',
    },
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projet',
      required: [true, 'Une tâche doit être rattachée à un projet'],
    },
    dateEcheance: {
      type: Date,
      default: null,
    },
    ordre: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tache', tacheSchema);
