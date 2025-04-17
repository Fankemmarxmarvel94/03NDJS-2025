
// Notre "base de données" en mémoire
let users = [];

// Fonction pour ajouter un utilisateur
const addUser = (user) => {
  users.push(user);
  console.log('UserModel: Utilisateur ajouté, utilisateurs actuels:', users); // Débogage
};

// Fonction pour trouver un utilisateur par email
const findUserByEmail = (email) => {
  console.log(`UserModel: Recherche de l'email: ${email}`); // Débogage
  return users.find(user => user.email === email);
};

// Fonction pour trouver un utilisateur par ID
const findUserById = (id) => {
  console.log(`UserModel: Recherche de l'ID: ${id}`); // Débogage
  return users.find(user => user.id === id);
};

// Fonction pour obtenir tous les utilisateurs (infos publiques)
const getAllUsers = () => {
  console.log('UserModel: Récupération de tous les utilisateurs (publics)'); // Débogage
  // Retourne une copie avec seulement les infos publiques
  return users.map(user => ({ id: user.id, email: user.email }));
};

// Fonction pour supprimer un utilisateur par ID
const deleteUserById = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    console.log(`UserModel: Utilisateur avec ID ${id} supprimé. Utilisateurs restants:`, users); // Débogage
    return true; // Succès
  }
  console.log(`UserModel: Utilisateur avec ID ${id} non trouvé pour suppression.`); // Débogage
  return false; // Non trouvé
};

module.exports = {
  addUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  deleteUserById
};
