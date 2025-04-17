
const userModel = require('../models/userModel');

// Logique pour récupérer l'utilisateur courant (depuis le token)
const getCurrentUser = (req, res) => {
  // Le middleware `authenticateToken` a déjà validé et attaché `req.user`
  if (req.user && req.user.email) {
    // On peut renvoyer l'email directement du token, ou chercher plus d'infos si besoin
    res.status(200).json({ email: req.user.email });
  } else {
    // Ne devrait pas arriver si le middleware fonctionne, mais sécurité
    res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur.' });
  }
};

// Logique pour récupérer tous les utilisateurs
const getAllUsersController = (req, res) => {
  try {
    const users = userModel.getAllUsers(); // Récupère les infos publiques
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur dans getAllUsersController:", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Logique pour supprimer un utilisateur
const deleteUserController = (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const success = userModel.deleteUserById(userIdToDelete);

    if (success) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error("Erreur dans deleteUserController:", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};


module.exports = {
  getCurrentUser,
  getAllUsersController,
  deleteUserController
};
