import React,{createContext,useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    userId: localStorage.getItem('userId') || '',
  });

   // Fonction pour mettre à jour l'utilisateur lors de la connexion
   const handleLogin = (firstName, lastName, userId) => {
    console.log("Mise à jour du contexte utilisateur :", {firstName, lastName, userId });

    setUser ({ firstName, lastName, userId });
    localStorage.setIter('firstName', firstName);
    localStorage.setIten ('lastName', lastName);
    localStorage.setIten('userId', userId);
   };
   const handleLogout =()=>{
    localStorage.removeltem('firstName');
	localStorage.removeltem('lastName');
	localStorage.removeltem('userId');


	// Réinitialiser l'état utilisateur
	setUser ({
		firstName: '',
		lastName: '',
		userId: ''
	});

	// Recharger la page pour réinitialiser l'application
	window.location.reload();
  };
  return (

    <UserContext.Provider value={{ user,handleLogin, handleLogout }}>

      {children}

    </UserContext.Provider>

  );

};