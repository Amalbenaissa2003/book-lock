
import React, { useState } from 'react';
import axios from 'axios';
import imagePath from '../assets/6.jpg';
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await axios.post('http://localhost:5000/api/user/register', formData);

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
      <h2>Inscription</h2>
      {/* Affichage des messages généraux */}
      {message && (
        <p className={message.type === "success" ? "success-message" : "error-message"}>
        {message}
        </p>
      )}
      {/*message && <p className="success-message">{message}</p>*/}
      {/*errors.general && <p className="error-message">{errors.general}</p>*/}

      <form onSubmit={handleSubmit}>

        {/* Champ Prénom */}
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Entrez votre prénom"
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        {/* Champ Nom */}
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Entrez votre nom"
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

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

        {/* Champ Confirmation du mot de passe */}
        <div className="form-group">
          <label>Confirmez le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez votre mot de passe"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <p className="paragraph-text">Vous n'avez pas de compte ?<a href="./Login.js" className="link-text"> S'inscrire</a></p>
       
        <button type="submit" className="btn-submit">
          S'inscrire
        </button>
        
      </form>
    </div>
    </div>
  );
};

export default Register;

