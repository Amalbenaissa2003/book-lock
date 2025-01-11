const User = require("../models/User");

//Register user
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const errors = {};  // Objet pour stocker les erreurs de validation

    // Vérifications des validations et ajout des erreurs à l'objet 'errors'
    if (!firstName || firstName.length < 2) {
        errors.firstName = "Le prénom doit comporter au moins 2 caractères.";
    }
    if (!lastName || lastName.length < 2) {
        errors.lastName = "Le nom doit comporter au moins 2 caractères.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.email = "Veuillez introduire une adresse e-mail valide.";
    }
    if (!password || password.length < 8) {
        errors.password = "Le mot de passe doit comporter au moins 8 caractères.";
    }
    if (password !== confirmPassword) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    // Si des erreurs ont été trouvées, les renvoyer dans la réponse
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            type: "error",
            errors
        });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ type: "error",message: "Adresse e-mail existe déjà." });
        }

        // Création de l'utilisateur
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ type: "success", message: "Utilisateur enregistré avec succès !" });
    } catch (err) {
        res.status(500).json({ type: "error" ,message: "Une erreur s'est produite lors de l'inscription.", error: err.message });
    }
};



//login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
        errors.email = "Email est requis" ;
    }
    if (!password) {
        errors.password ="Mot de passe est requis." ;
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            type: "error",
            errors
        });
    }
    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            res.status(201).json({ type: "error", message: "Utilisateur non trouvé." });
        }
        

        const isMatch = await user.matchPassword(password) ;
        if (!isMatch) return res.status(201).json({ type: "error", message: 'Mot de passe incorrect' });
        
        
        // Crée une session pour l'utilisateur
        req.session.user = { 
            id: user._id, 
            firstName: user.firstName,
            lastName: user.lastName };


            res.status(201).json({ type:"success", message: "Connexion réussie !", user: req.session.user  });

    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion.", error: err.message });
    }
};
