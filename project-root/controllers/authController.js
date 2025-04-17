
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const config = require('../config'); // Importer la configuration (pour JWT_SECRET)

// Logique pour l'enregistrement
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const existingUser = userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(), // ID simple pour l'exemple
      email: email,
      passwordHash: passwordHash
    };

    userModel.addUser(newUser);

    // Ne pas renvoyer le hash
    const userResponse = { id: newUser.id, email: newUser.email };
    res.status(201).json(userResponse);

  } catch (error) {
    console.error("Erreur dans registerUser:", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Logique pour la connexion
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const user = userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const payload = {
      userId: user.id,
      email: user.email
    };

    jwt.sign(
      payload,
      config.JWT_SECRET, // Utiliser la clé depuis config.js
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Erreur lors de la création du JWT:', err);
          return res.status(500).json({ message: 'Erreur lors de la connexion.' });
        }
        res.status(200).json({ token: token });
      }
    );

  } catch (error) {
    console.error("Erreur dans loginUser:", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
