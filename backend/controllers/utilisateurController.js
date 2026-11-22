const Utilisateur = require('../models/Utilisateur');
const Participation = require('../models/Participation');

// GET /api/utilisateurs
exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find().sort({ nom: 1 });
    res.json({ success: true, data: utilisateurs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/utilisateurs/:id
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur)
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });

    // Récupérer les projets de cet utilisateur via participations (populate)
    const participations = await Participation.find({ utilisateur: req.params.id })
      .populate('projet', 'nom statut couleur');

    res.json({
      success: true,
      data: { ...utilisateur.toObject(), projets: participations },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/utilisateurs
exports.createUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.status(201).json({ success: true, data: utilisateur, message: 'Utilisateur créé' });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/utilisateurs/:id
exports.updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!utilisateur)
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    res.json({ success: true, data: utilisateur, message: 'Utilisateur mis à jour' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/utilisateurs/:id
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur)
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    await Participation.deleteMany({ utilisateur: req.params.id });
    await utilisateur.deleteOne();
    res.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/utilisateurs/:id/projets/:projetId  — Ajouter à un projet
exports.ajouterAuProjet = async (req, res) => {
  try {
    const participation = await Participation.create({
      utilisateur: req.params.id,
      projet: req.params.projetId,
      role: req.body.role || 'développeur',
    });
    const pop = await participation.populate(['utilisateur', 'projet']);
    res.status(201).json({ success: true, data: pop, message: 'Ajouté au projet' });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ success: false, message: 'Déjà membre de ce projet' });
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/utilisateurs/:id/projets/:projetId  — Retirer d'un projet
exports.retirerDuProjet = async (req, res) => {
  try {
    const result = await Participation.findOneAndDelete({
      utilisateur: req.params.id,
      projet: req.params.projetId,
    });
    if (!result)
      return res.status(404).json({ success: false, message: 'Participation introuvable' });
    res.json({ success: true, message: 'Retiré du projet' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};