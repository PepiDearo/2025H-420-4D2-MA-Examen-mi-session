const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importer le module db
const SECRET_KEY = require('./secret_key');  // Importer la clé secrète

// Pour lire le corps des requêtes JSON
app.use(express.json());


// Middleware pour vérifier le token
///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant.' });
  }


  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  console.log('Token utilisé :', token);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // Le token n’est pas valide ou a expiré
      return res.status(403).json({ message: 'Token invalide ou expiré.' });
    }

    // Décodé contient { userId: ..., email: ..., iat: ..., exp: ... }
    req.user = decoded; // On attache l’info décodée à l’objet req
    console.log('Token décodé :', decoded);
    next();             // On passe au prochain middleware ou route
  });
}

///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Les champs email et password sont requis' });
  }

  try {
    // Générer le hash du mot de passe
    const saltRounds = 10; // plus c’est élevé, plus c’est lent mais plus c’est sécurisé
    const hash = await bcrypt.hash(password, saltRounds);

    // Insérer dans la BD
    await db('users').insert({ email, password: hash });

    // L’utilisateur est enregistré
    res.status(201).json({ message: 'Utilisateur enregistré avec succès !' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erreur interne.' });
  }

});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Username et mot de passe requis.' });
  }

  try {

    const user = await db('users').where({ email }).first();

    if (!user) {

      return res.status(401).json({ message: 'Identifiants invalides.' });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Mot de passe incorrect
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      SECRET_KEY,                           
      { expiresIn: '1h' }                   
    );

    console.log('Utilisateur authentifié :', user.email);
    console.log('Token généré :', token);

    // Envoyer le token au client
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erreur interne.' });
  }


});


///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
app.post('/:user/emprunts', verifyToken, async (req, res) => {
  
  const { id_livre } = req.body;
  const { user } = req.params;

  if (!id_livre) {
    return res.status(400).json({ message: "L'identifiant du livre est requis." });
  }

  if (!user) {
    return res.status(400).json({ message: "Email/utilisateur est requis." });
  }

  try {
    const livre = await db('livres').where({ id_livre }).first();
    

    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    const empruntExistant = await db('emprunts').where({ id_livre }).first();
    

    if (empruntExistant) {
      return res.status(400).json({ message: 'Le livre est déjà emprunté.' });
    }

    const [id_emprunt] = await db('emprunts').insert({
      id_livre: id_livre,
      emprunt_name: user
    });
    

    res.status(201).json({ id_emprunt });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
app.get('/:user/emprunts', async (req, res) => {
  const {user}=req.params;

  if (!user){
    return res.status(500).json('Utilisateur non existant')
  }

  userEmprunts=await db("emprunts").select('*').where({emprunt_name:user})
  res.status(201).json({"Recuperation d'emprunts reussi":userEmprunts})


}
);

///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
app.get('/livres', async (req, res) => {
  try {
    
    const livres = await db('livres').select('*');

    
    res.status(200).json(livres);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

///////////////////////////////////////////////////////////////////////////////
// CODE À AJOUTER
app.delete('/admin/:user/delete`', async (req, res) => {
  //
  ///////////////////////////////////////////////////////////////////////////////
}
);

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});





//ajouter un livre //test


app.post('/livres', async (req, res) => {
  const { titre, author } = req.body

  try {
    const livre = await db('livres').insert({ titre, author })
    res.json(livre)
    res.status(201).json("Livre ajouter avec succes")
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erreur interne.' });
  }
}



)



