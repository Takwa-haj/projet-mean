// routes/projetRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProjets,
  getProjetById,
  createProjet,
  updateProjet,
  deleteProjet,
} = require('../controllers/projetController');

// Routes projets
router.get('/', getAllProjets);         // GET    /api/projets
router.get('/:id', getProjetById);     // GET    /api/projets/:id
router.post('/', createProjet);        // POST   /api/projets
router.put('/:id', updateProjet);      // PUT    /api/projets/:id
router.delete('/:id', deleteProjet);   // DELETE /api/projets/:id

module.exports = router;
