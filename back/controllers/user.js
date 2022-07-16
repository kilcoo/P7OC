const User = require('../models/userModels')                           // on demande d'utiliser le models dans user models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');                                // on demande d'utiliser bcrypt pour crypter les donnees
const auth = require('../middleware/auth');


exports.signup = (req, res, next) => {     // un middleware pour pouvoir s'inscrire                         
  User.findOne({ email: req.body.email })                                        // on demande de trouver si un email correspond a ce qui est ecrit
  .then(user => {
    if (user) {                                                              // si les info du user n'est pas trouver 
      return res.status(401).json({ error: 'Utilisateur existant' });     // il va nous donner une erreur 401 avec un message d'erreur
    }
  bcrypt.hash(req.body.password, 10)                            // on demande de crypter les donnees
    .then(hash => {
      const user = new User({
        username : req.body.username,
        email: req.body.email,
        password: hash,
        role: "salarie",
        bio : null,
        profilePicture: null ,
      }); 
      user.save()                                                                   // on sauvegarde les infos
        .then(() => {
        return res.status(201).json({message:"compte cree"})
        })       
        
        .catch(error => res.status(400).json({ error }));                           // sinon erreur 400
    })
    .catch(error => res.status(500).json({error}));
    })
};
exports.login = (req, res, next) => {                                           // un middleware pour pouvoir se connecter
  User.findOne({ email: req.body.email })                                        // on demande de trouver si un email correspond a ce qui est ecrit
    .then(user => {
      if (!user) {                                                              // si les info du user n'est pas trouver 
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });     // il va nous donner une erreur 401 avec un message d'erreur
      }
      bcrypt.compare(req.body.password, user.password)                          // on compare les infos donner
        .then(valid => {
          if (!valid) {                                                         // si pas valid on enverra l'erreur 401
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } 
          const userId = user._id
          const role = user.role.toString()
          res.status(200).json({ 
             username : user.username,               
            userId: userId,
            role: role,
            Email : user.email,
            token: jwt.sign(
              { userId: user._id ,role:role},
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
exports.modifyPicture = (req, res, next) => {
  User.findOne({ userId: req.body.userId }).then((user) => {
    if (user.id == req.auth.userId || req.auth.role == "admin") {
      if (user.profilePicture !== null) {
        let file = user.profilePicture.split("/images")[1];
        fs.unlink(`images/${file}`, (error) => {
          if (error) {
            console.log("failed");
          }
          User.updateOne(
            { userId: req.body.userId },
            {
              profilePicture: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          );
        });
      }
    }
  });
};