
const express = require('express');
const {addBook , getAllBooks ,getBookDetails,updateBook, deleteBook, Favoris} = require('../controllers/BookController');
const {authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addBook); // Ajouter un livre
router.get('/', getAllBooks); // Lister tous
router.get("/:bookId", getBookDetails); // Détails d'un livre
router.put("/:bookId", authMiddleware, updateBook); // Mettre à jour un livre
router.delete("/:bookId", authMiddleware, deleteBook); // supp un livre
router.post("/:bookId/favorite", authMiddleware, Favoris);// Ajouter ou supp des favoris

module.exports = router;
