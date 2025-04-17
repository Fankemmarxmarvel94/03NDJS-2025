const jwtSecret = process.env.JWT_SECRET;

// Avertissement si la variable n'est pas définie et qu'on utilise une clé par défaut
if (!jwtSecret) {
  console.warn('*******************************************************************');
  console.warn('*** ATTENTION: Variable d\'environnement JWT_SECRET non définie. ***');
  console.warn('*** Utilisation d\'une clé secrète par défaut NON SÉCURISÉE.     ***');
  console.warn('*** Veuillez définir JWT_SECRET dans un fichier .env ou via      ***');
  console.warn('*** les variables d\'environnement de votre système/plateforme. ***');
  console.warn('*******************************************************************');
}



module.exports = {
  // !! IMPORTANT !! : Remplace cette clé par une chaîne complexe et garde-la secrète.
  // Idéalement, utilise une variable d'environnement (process.env.JWT_SECRET)
  JWT_SECRET: jwtSecret || 'votre_super_cle_secrete_a_changer_absolument'
};
