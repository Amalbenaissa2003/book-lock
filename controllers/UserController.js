const User = require("../models/User");

//Register user
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Vérifier les validations
    if (!firstName || firstName.length < 2) {
        return res.status(400).json({ message: "Le prénom doit comporter au moins 2 caractères." });
    }
    if (!lastName || lastName.length < 2) {
        return res.status(400).json({ message: "Le nom doit comporter au moins 2 caractères." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Veuillez introduire une adresse e-mail valide." });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Le mot de passe doit comporter au moins 8 caractères." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Adresse e-mail existe déjà." });
        }
        // Création de l'utilisateur
        const newUser = new User ({firstName,lastName,email,password});
        await newUser.save();
    
        res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription.", error: err.message });
    }
};


//login user

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email est requis" });
    }
    if (!password) {
        return res.status(400).json({ message: "Mot de passe est requis." });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }
        

        const isMatch = await user.matchPassword(password) ;
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });
        
        
        // Crée une session pour l'utilisateur
        req.session.user = { 
            id: user._id, 
            firstName: user.firstName,
            lastName: user.lastName };


        res.status(200).json({ message: "Connexion réussie !", user: req.session.user  });

    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion.", error: err.message });
    }
};
