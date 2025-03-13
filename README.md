# Examen mi-session 420-4D2-MA Hiver 2025

- Vous allez devoir compléter le code source de ce projet pour qu'il réponde aux
  exigences demandées.
- Vous remettez votre fichier **index.js**, **request.http** et **db.js** sur Omnivox. (Vous pouvez faire
  trois remises ou une seule avec un fichier zip contenant les trois fichiers)
- Durée 2 heures
- IA interdite

## Descriptions

Vous devez concevoir un micro-service pour une bibliothèque de votre quartier.
Ce micro-service doit permettre de gérer les utilisateurs et la gestion des
prêts.

## Consignes

1. Dans le fichier **db.js**, vous devez compléter le code pour initialiser la
   base de données SQLite. Notamment, il faut trois tables: `users`, `livres` et
   `emprunts`. Vous devez définir _par vous-même_ les champs de chaque table qui vous
   semblent pertinents pour répondre aux exigences de l'examen. N'oubliez pas que votre
   temps est limité, donc ne perdez pas de temps à définir des champs inutiles.

   Pour vous simplifier la tâche, vous n'avez pas à gérer les contraintes d'intégrité
   référentielle (clés étrangères) dans la base de données.

2. Le code qui initialise la base de données doit ajouter un utilisateur **admin** dans la
   table `users`. Cet utilisateur doit avoir comme couriel `admin@example.com` et le mot de passe
   `admin`. Attention, le mot de passe doit être hashé avant d'être enregistré dans la base de
   données à l'aide de la fonction `bcrypt.hash`. La clé secrète est déjà importée dans le fichier
   **db.js**.

3. Vous devez ajouter les routes suivantes:

   1. `POST /signup` : Cette route permet à un utilisateur de s'inscrire. Elle
      prend en paramètre un objet JSON avec les champs `email` et `password`.
      Si l'utilisateur n'existe pas déjà dans la base de données, la route crée
      un nouvel utilisateur. Le mot de passe doit être hashé avant d'être
      enregistré dans la base de données à l'aide de la fonction `bcrypt.hash`.

      Si l'utilisateur existe déjà, elle retourne un message d'erreur.

   2. `POST /login` : Cette route permet à un utilisateur de se connecter. Elle prend en
      paramètre un objet JSON avec les champs `username` et `password`. Si l'utilisateur
      existe dans la base de données et que le mot de passe est correct, la route retourne
      un objet JSON avec un champ `token` qui contient un jeton d'authentification. Si
      l'utilisateur n'existe pas ou que le mot de passe est incorrect, la route retourne
      une erreur.

   3. `POST /:user/emprunt` : Cette route permet à un utilisateur de faire un
      emprunt. Elle prend en paramètre un objet JSON avec le champs
      `id_livre`. Elle prend aussi le `token`. Si le livre est disponible et
      que le token est valide, la route crée un emprunt dans la base de
      données et retourne un objet JSON avec un champ `id_emprunt` qui contient
      l'identifiant de l'emprunt. Si le livre n'est pas disponible ou que le
      token est invalide, la route retourne une erreur.

   4. `GET /:user/emprunts` : Cette route retourne la liste des emprunts de
      l'utilisateur connecté. Elle prend le `token`. La route
      retourne un tableau JSON avec les emprunts de l'utilisateur. Chaque
      emprunt doit contenir les champs `id_emprunt`, `id_livre`. Bien sûr le `token` doit être valide.

   5. `GET /livres` : Cette route retourne la liste des livres **disponibles**. Un livre est
      disponible s'il n'est pas emprunté. La route doit retourner un tableau JSON avec
      les livres disponibles. Chaque livre doit contenir les champs `id_livre`, `titre` et
      `auteur`.

   6. `DELETE /admin/:user/delete` : Cette route permet à l'administrateur de
      supprimer un utilisateur. Elle prend le `token`. Le user_id à supprimer est passé
      dans l'URL. Si l'utilisateur existe, la route le supprime de la base de
      données et retourne un message de succès. Si l'utilisateur n'existe pas,
      la route retourne une erreur.

      Vous devez vérifier que l'utilisateur connecté est bien un
      administrateur. Pour rappel, votre token devrait contenir des
      informations sur l'utilisateur connecté.

   7. Écrivez un test pour chaque route. Vous devez utiliser le fichier
      **request.http** pour écrire vos tests.

## Astuces

- La commande `npm install` permet d'installer les dépendances.
- La commande `npm run dev` permet de démarrer le serveur en mode développement.
- Vous pouvez ajouter d'autres routes **si vous le désirez** pour vous aider. Par
  exemple pour retourner l'état de la base de données. Commencez vos routes de
  tests par `/test/`. Les routes de tests ne sont **pas** évaluées.

## À faire en premier une fois l'examen terminé

Aller vous chercher un bon livre à la bibliothèque pour vous détendre!
