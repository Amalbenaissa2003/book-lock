const Book = require('../models/Book');


//ajouter un livre
exports.addBook = async (req,res)=> {
    const {title, description ,image}=req.body;

    if (!title ){
        return res.status(400).json({message: "Titre est requis"});
    }
    if (!description || description.length < 5){
        return res.status(400).json({message: "Description est requise et doit comporter au moins 5 caractères."});
    }    
    if (!image) {
        return res.status(400).json({ message: "L'image est requise." });
    }
    
    try{

        //verification de l'existance du livre
        const book = await Book.findOne ({title});
        if (book) return res.status(404).json({message : 'Le livre existe déjà '});
        
        //creation d'un nouveau livre
        const newBook = await Book.create({
            title,
            description,
            image,
            createdBy: req.user.id, // `req.user` contient l'utilisateur connecté
        });

        // Ajouter automatiquement ce livre aux favoris de l'utilisateur connecté
        newBook.favorites.push(req.user.id);
        await newBook.save();
        res.status(201).json({message: 'Livre ajouter avec succès'})
        
    }catch (error) {
        res.status(500). json({ message: "Erreur lors de l'ajout du livre .", error:error.message }) ;
    }
};

//lister tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("createdBy", "firstName lastName").populate("favorites", "firstName");
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: "Erreur dans la recherche des livres.", error: err.message });
    }
};


//Voir les détails d'un livre 

exports.getBookDetails = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId)
            .populate("createdBy", "firstName lastName")
            .populate("favorites", "firstName lastName");

        if (!book) return res.status(404).json({ message: "Livre non trouvé." });

        res.status(200).json({ book });
    } catch (err) {
        res.status(500).json({ message: "Erreur dans la recherche des détails d'un livre.", error: err.message });
    }

    
};

//Mettre à jour ou supprimer un livre

exports.updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, description,image } = req.body;

    try {
        const book = await Book.findById(bookId);

        if (!book) return res.status(404).json({ message: "Livre non trouvé." });

        // Vérifier si l'utilisateur est le créateur
        if (book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'avez pas le droit de mettre à jour le livre." });
        }

        // Mettre à jour le livre
        if (title) book.title = title;
        if (description) book.description = description;
        if (image) book.image = image;
        await book.save();

        res.status(200).json({ message: "Livre mis à jour avec succès!", book });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du livre ", error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId);

        if (!book) return res.status(404).json({ message: "Livre non trouvé." });

        // Vérifier si l'utilisateur est le créateur
        if (book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer le livre." });
        }

        await book.deleteOne({ _id: bookId })

        res.status(200).json({ message: "Livre supprimé avec succès!" });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du livre.", error: err.message });
    }
};


//Ajouter ou supp un livre des favoris
exports.Favoris = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Livre non trouvé." });

        const userId = req.user.id;

        // Vérifier si l'utilisateur a déjà favorisé le livre
        const isFavorite = book.favorites.includes(userId);

        if (isFavorite) {
            book.favorites = book.favorites.filter((id) => id.toString() !== userId);
            await book.save();
            return res.status(200).json({ message: "Livre enlevé des favoris." });
        } else {
            book.favorites.push(userId);
            await book.save();
            return res.status(200).json({ message: "Livre ajouté aux  favoris." });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour des favoris.", error: err.message });
    }
};

