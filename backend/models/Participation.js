const mongoose = require('mongoose');

// C'est la TABLE DE JONCTION entre Utilisateur et Projet
// Elle réalise la relation Many-to-Many
const participationSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
      required: true,
    },
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projet',
      required: true,
    },
    role: {
      type: String,
      enum: ['développeur', 'testeur', 'devops', 'architecte'],
      default: 'développeur',
    },
    heuresTravaillees: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Empêcher un utilisateur d'être ajouté deux fois au même projet
participationSchema.index({ utilisateur: 1, projet: 1 }, { unique: true });

module.exports = mongoose.model('Participation', participationSchema);