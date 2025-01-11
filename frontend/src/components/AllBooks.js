import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllBooks.css'; // Assurez-vous de créer un fichier CSS pour styliser les éléments

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/'); // Modifiez l'URL selon votre configuration
        setBooks(response.data.books);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="info-section">
    <h2 className="section-title">Liste de livres</h2>
    <section className="info-section">
        {books.map(book => (
            <div className="book-card" key={book._id}>
                <div className="container-book-photo">
                    <img src={book.image} alt={book.title} />
                </div>
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">Ajouté par : {book.createdBy.firstName} {book.createdBy.lastName}</p>
            </div>
        ))}
    </section>
</section>

  );
};

export default AllBooks;

