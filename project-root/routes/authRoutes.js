
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route POST pour l'enregistrement
router.post('/register', authController.registerUser);

// Route POST pour la connexion
router.post('/login', authController.loginUser);

module.exports = router; // Exporter le routeur
