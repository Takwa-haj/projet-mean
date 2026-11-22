// models/Projet.js
const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du projet est obligatoire'],
      trim: true,
      minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
      default: '',
    },
    dateDebut: {
      type: Date,
      default: Date.now,
    },
    dateFin: {
      type: Date,
      default: null,
    },
    statut: {
      type: String,
      enum: ['actif', 'en_pause', 'terminé', 'annulé'],
      default: 'actif',
    },
    couleur: {
      type: String,
      default: '#6366f1',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual : tâches liées au projet
projetSchema.virtual('taches', {
  ref: 'Tache',
  localField: '_id',
  foreignField: 'projet',
});

module.exports = mongoose.model('Projet', projetSchema);
