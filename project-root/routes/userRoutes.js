
const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Importer le middleware

const router = express.Router();

// Appliquer le middleware d'authentification à toutes les routes ci-dessous dans ce fichier
// Ou appliquer individuellement comme montré ci-dessous

// Route GET pour récupérer l'utilisateur actuel (protégée)
router.get('/me', authenticateToken, userController.getCurrentUser);

// Route GET pour récupérer tous les utilisateurs (protégée)
router.get('/', authenticateToken, userController.getAllUsersController); // Notez que c'est '/' car le préfixe '/users' sera dans server.js

// Route DELETE pour supprimer un utilisateur par ID (protégée)
router.delete('/:id', authenticateToken, userController.deleteUserController); // Notez que c'est '/:id'

module.exports = router; // Exporter le routeur
