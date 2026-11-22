const express = require('express');
const router = express.Router();
const {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  ajouterAuProjet,
  retirerDuProjet,
} = require('../controllers/utilisateurController');

router.get('/',    getAllUtilisateurs);
router.get('/:id', getUtilisateurById);
router.post('/',   createUtilisateur);
router.put('/:id', updateUtilisateur);
router.delete('/:id', deleteUtilisateur);

// Routes Many-to-Many
router.post('/:id/projets/:projetId',   ajouterAuProjet);
router.delete('/:id/projets/:projetId', retirerDuProjet);

module.exports = router;