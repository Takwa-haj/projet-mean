// routes/tacheRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTaches,
  getTacheById,
  createTache,
  updateTache,
  updateStatutTache,
  deleteTache,
} = require('../controllers/tacheController');

// Routes tâches
router.get('/', getAllTaches);                    // GET    /api/taches  (?projet=id&statut=...&priorite=...)
router.get('/:id', getTacheById);                // GET    /api/taches/:id
router.post('/', createTache);                   // POST   /api/taches
router.put('/:id', updateTache);                 // PUT    /api/taches/:id
router.patch('/:id/statut', updateStatutTache);  // PATCH  /api/taches/:id/statut
router.delete('/:id', deleteTache);              // DELETE /api/taches/:id

module.exports = router;
