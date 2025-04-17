const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Importer les routes d'authentification
const userRoutes = require('./routes/userRoutes'); // Importer les routes utilisateur

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global pour parser le JSON
app.use(express.json());

// Routes de base (non protégée)
app.get('/api', (req, res) => {
  res.send('API d\'authentification fonctionne ! Bienvenue.');
});

// Montage des routeurs avec un préfixe
// Toutes les routes dans authRoutes seront préfixées par /api/auth
app.use('/api/auth', authRoutes);
// Toutes les routes dans userRoutes seront préfixées par /api/users
app.use('/api/users', userRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Point de terminaison d'authentification : http://localhost:${PORT}/api/auth`);
  console.log(`Point de terminaison utilisateur : http://localhost:${PORT}/api/users`);
});
