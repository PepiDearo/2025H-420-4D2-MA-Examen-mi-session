const knex = require('knex');
const SECRET_KEY = require('./secret_key');

// Initialiser la connexion à la base de données avec Knex
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
});

///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
//
// Initialisation de la table "users" si elle n'existe pas
//
// Initialisation de la table "livres" si elle n'existe pas
//
// Initialisation de la table "emprunts" si elle n'existe pas
///////////////////////////////////////////////////////////////////////////////
module.exports = db;