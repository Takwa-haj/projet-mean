// controllers/projetController.js
const Projet = require('../models/Projet');
const Tache = require('../models/Tache');

// GET /api/projets — Liste tous les projets avec stats
exports.getAllProjets = async (req, res) => {
  try {
    const projets = await Projet.find().sort({ createdAt: -1 });

    // Calcul du pourcentage d'avancement pour chaque projet
    const projetsAvecStats = await Promise.all(
      projets.map(async (projet) => {
        const taches = await Tache.find({ projet: projet._id });
        const total = taches.length;
        const terminees = taches.filter((t) => t.statut === 'terminé').length;
        const avancement = total > 0 ? Math.round((terminees / total) * 100) : 0;

        return {
          ...projet.toObject(),
          stats: { total, terminees, avancement },
        };
      })
    );

    res.json({ success: true, data: projetsAvecStats, count: projets.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// GET /api/projets/:id — Détail d'un projet avec ses tâches (populate)
exports.getProjetById = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ success: false, message: 'Projet introuvable' });
    }

    const taches = await Tache.find({ projet: projet._id }).sort({ ordre: 1, createdAt: 1 });
    const total = taches.length;
    const terminees = taches.filter((t) => t.statut === 'terminé').length;
    const avancement = total > 0 ? Math.round((terminees / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        ...projet.toObject(),
        taches,
        stats: { total, terminees, avancement },
      },
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// POST /api/projets — Créer un projet
exports.createProjet = async (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, statut, couleur } = req.body;

    const projet = await Projet.create({ nom, description, dateDebut, dateFin, statut, couleur });

    res.status(201).json({ success: true, data: projet, message: 'Projet créé avec succès' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};

// PUT /api/projets/:id — Modifier un projet
exports.updateProjet = async (req, res) => {
  try {
    const projet = await Projet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!projet) {
      return res.status(404).json({ success: false, message: 'Projet introuvable' });
    }

    res.json({ success: true, data: projet, message: 'Projet mis à jour avec succès' });
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

// DELETE /api/projets/:id — Supprimer un projet et ses tâches
exports.deleteProjet = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ success: false, message: 'Projet introuvable' });
    }

    // Suppression en cascade des tâches liées
    const tachesSupprimees = await Tache.deleteMany({ projet: req.params.id });
    await projet.deleteOne();

    res.json({
      success: true,
      message: `Projet supprimé avec ${tachesSupprimees.deletedCount} tâche(s) associée(s)`,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
  }
};
