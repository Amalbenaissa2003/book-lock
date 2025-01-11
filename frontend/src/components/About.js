import React from 'react';
import imagePath from '../assets/17.jpg';
import "./about.css";

const About = () => {
    return(

        <section className="aboutus">
        <div className="container">
            <div className="about-us-box">
                <ul className="about-us">

                    <li className="about-us-img">
                        <img src={imagePath} alt="img" />
                    </li>
    
                    <li className="about-us-txt">
                      <p className="footer-list-title">Bienvenue Our Store</p>

                      <p>Notre Book Club est une plateforme communautaire dédiée aux passionnés de lecture, où les histoires ont le pouvoir de connecter, inspirer et transformer des vies.</p>

                      <p>Que vous soyez adepte de classiques intemporels, de best-sellers modernes ou de joyaux littéraires cachés, notre espace vous permet de découvrir, partager et discuter des livres qui vous passionnent. </p>
                        
                      <p>Les membres peuvent ajouter leurs titres favoris, explorer ce que les autres lisent et engager des discussions significatives, le tout dans un environnement chaleureux.</p>
                        
                      <p>Rejoignez-nous pour célébrer la joie de lire, tisser des liens et transformer chaque page en une nouvelle aventure partagée !</p>
                    </li>

                </ul>
            </div>
        </div>
      </section> 
    );
};

export default About;