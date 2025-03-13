const knex = require('knex');
const SECRET_KEY = require('./secret_key');
const bcrypt = require('bcryptjs');

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
db.schema.hasTable('users').then(exists => {
  if (!exists) {
    return db.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('password');
    });
  }


  
});


// Initialisation de la table "livres" si elle n'existe pas
db.schema.hasTable('livres').then(exists => {
  if (!exists) {
    return db.schema.createTable('livres', table => {
      table.increments('id_livre').primary();
      table.string('titre').unique();
      table.string('author');
    });
  }



});
// Initialisation de la table "emprunts" si elle n'existe pas
db.schema.hasTable('emprunts').then(exists => {
  if (!exists) {
    return db.schema.createTable('emprunts', table => {
      table.increments('id_emprunt').primary();
      table.integer('id_livre')
      table.string('emprunt_name')
    });
  }
});
module.exports = db;


//ajouter utilisateur admin





//faute faire node db.js 2 fois pour quelque raisons    ??
async function ajouterAdmin() {
  const email = "admin@example.com";
  const password = "admin"

  // Générer le hash du mot de passe
  const saltRounds = 10; // plus c’est élevé, plus c’est lent mais plus c’est sécurisé
  const hash = await bcrypt.hash(password, saltRounds);



    try {

      const userAdmin = await db('users').where({ email:email }).first();
      if(!userAdmin){
      // Insérer dans la BD
      await db('users').insert({ email: email, password: hash });

    } }catch (err) {
      console.log(err);
    }
  

};

ajouterAdmin();