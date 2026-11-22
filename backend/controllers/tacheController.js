// controllers/tacheController.js
const Tache = require('../models/Tache');
const Projet = require('../models/Projet');

// GET /api/taches — Liste toutes les tâches (optionnel: filtre par projet et/ou statut)
exports.getAllTaches = async (req, res) => {
  try {
    const filter = {};
    if (req.query.projet) filter.projet = req.query.projet;
    if (req.query.statut) filter.statut = req.query.statut;
    if (req.query.priorite) filter.priorite = req.query.priorite;

    const taches = await Tache.find(filter)
      .populate('projet', 'nom couleur')
      .sort({ ordre: 1, createdAt: 1 });

    res.json({ success: true, data: taches, count: taches.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// GET /api/taches/:id — Détail d'une tâche
exports.getTacheById = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id).populate('projet', 'nom couleur statut');
    if (!tache) {
      return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }
    res.json({ success: true, data: tache });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// POST /api/taches — Créer une tâche
exports.createTache = async (req, res) => {
  try {
    const { titre, description, statut, priorite, projet, dateEcheance, ordre } = req.body;

    // Vérifier que le projet existe
    const projetExistant = await Projet.findById(projet);
    if (!projetExistant) {
      return res.status(404).json({ success: false, message: 'Projet associé introuvable' });
    }

    const tache = await Tache.create({ titre, description, statut, priorite, projet, dateEcheance, ordre });
    const tachePopulee = await tache.populate('projet', 'nom couleur');

    res.status(201).json({ success: true, data: tachePopulee, message: 'Tâche créée avec succès' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant de projet invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// PUT /api/taches/:id — Modifier une tâche
exports.updateTache = async (req, res) => {
  try {
    // Si projet est modifié, vérifier qu'il existe
    if (req.body.projet) {
      const projetExistant = await Projet.findById(req.body.projet);
      if (!projetExistant) {
        return res.status(404).json({ success: false, message: 'Projet associé introuvable' });
      }
    }

    const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('projet', 'nom couleur');

    if (!tache) {
      return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    res.json({ success: true, data: tache, message: 'Tâche mise à jour avec succès' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// PATCH /api/taches/:id/statut — Changer uniquement le statut (utile pour Kanban)
exports.updateStatutTache = async (req, res) => {
  try {
    const { statut } = req.body;
    const statutsValides = ['à faire', 'en cours', 'terminé'];

    if (!statut || !statutsValides.includes(statut)) {
      return res.status(400).json({
        success: false,
        message: `Statut invalide. Valeurs acceptées : ${statutsValides.join(', ')}`,
      });
    }

    const tache = await Tache.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true, runValidators: true }
    ).populate('projet', 'nom couleur');

    if (!tache) {
      return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }

    res.json({ success: true, data: tache, message: `Statut mis à jour : ${statut}` });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// DELETE /api/taches/:id — Supprimer une tâche
exports.deleteTache = async (req, res) => {
  try {
    const tache = await Tache.findByIdAndDelete(req.params.id);
    if (!tache) {
      return res.status(404).json({ success: false, message: 'Tâche introuvable' });
    }
    res.json({ success: true, message: 'Tâche supprimée avec succès' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};
