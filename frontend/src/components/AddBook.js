import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/books/add", // Remplacez par votre URL backend
        { title, description, image },
        { withCredentials: true } // Pour inclure les cookies de session
      );

      alert(response.data.message); // Message de succès
      navigate("/all-books"); // Redirige vers la page de tous les livres
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout du livre.");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Ajouter un Livre</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (URL)</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter le Livre</button>
      </form>
    </div>
  );
};

export default AddBook;
