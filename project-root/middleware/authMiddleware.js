
const jwt = require('jsonwebtoken');
const config = require('../config'); // Importer la configuration (pour JWT_SECRET)

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log("AuthMiddleware: Token manquant");
    return res.status(401).json({ message: 'Accès non autorisé: Token manquant.' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, userPayload) => { // Utiliser la clé depuis config.js
    if (err) {
      console.log("AuthMiddleware: Token invalide ou expiré", err.message);
      return res.status(401).json({ message: 'Accès non autorisé: Token invalide ou expiré.' });
    }
    console.log("AuthMiddleware: Token valide, payload:", userPayload);
    req.user = userPayload; // Attache le payload à la requête
    next(); // Passe au prochain middleware/handler
  });
};

module.exports = authenticateToken; // Exporter directement la fonction
