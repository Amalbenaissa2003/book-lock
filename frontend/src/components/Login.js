import React, { useState } from 'react';
import axios from 'axios';
import imagePath from '../assets/9.jpg';
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({}); // Réinitialiser les erreurs lors de la modification
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);

      // Afficher le message de succès et rediriger après un délai
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          // Gestion des erreurs spécifiques pour les champs
          const fieldErrors = {};
          Object.keys(err.response.data.errors).forEach((key) => {
            fieldErrors[key] = err.response.data.errors[key];
          });
          setErrors(fieldErrors);
        }if (err.response.data.message) {
          
          setMessage(err.response.data.message);
        }
      } else {
        setMessage({ general: "Une erreur s'est produite lors de l'inscription." });
      }
    }
    
  };

  return (
    <div className="register-container">
     
      <div className="image-container">
        <img src={imagePath} alt="Registration" />
      </div>
    
    <div className="form-container">
      <h2>ONNECTEZ-VOUS À VOTRE COMPTE</h2>
      {/* Affichage des messages généraux */}
      {message && (
        <p className={message.type === "success" ? "success-message" : "error-message"}>
        {message}
        </p>
      )}
    

      <form onSubmit={handleSubmit}>

        {/* Champ Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Champ Mot de passe */}
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <p className="paragraph-text">Vous n'avez pas de compte ?<Link to="/register" className="link-text"> S'inscrire</Link></p>
        {/* Bouton Soumettre */}
        <button type="submit" className="btn-submit">
          se connecter
        </button>
        
      </form>
    </div>
    </div>
  );
};

export default Login;