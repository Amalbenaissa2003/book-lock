
/*const authMiddleware = (req, res, next) => {
  // Vérifie si la session contient un utilisateur
  if (!req.session ) {
    return res.status(401).json({ message: "Non autorisé, veuillez vous connecter" });
  }
  // Associer l'utilisateur connecté à la requête
  req.user = req.session.user; 
  next();
};

module.exports = { authMiddleware };*/
const authMiddleware = (req, res, next) => {
  if ( !req.session || !req.session.user) {
      console.log("Session ou utilisateur non défini !");
      return res.status(401).json({ message: "Non autorisé, veuillez vous connecter" });
  }

  
  req.user = req.session.user;
  console.log("Utilisateur connecté :", req.user);
  next();
};module.exports = { authMiddleware };



/*const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assure-toi que ce modèle existe

exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé. Pas de token.' });

    try {
        const decoded = jwt.verify(token,"book");
        req.user = await User.findById(decoded.id).select('-password'); // Ajoute `req.user`
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};


/*const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports = { authMiddleware }
*/
