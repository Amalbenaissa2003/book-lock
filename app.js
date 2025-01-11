const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/UserRoutes');
const bookRoutes = require("./routes/BookRoutes");

dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(cors({
  credentials: true 
}));


app.use(express.json()); 


// Configuration des sessions
app.use(
  session({
    secret: 'userid', // Remplace par une chaîne secrète
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Met à true si tu utilises HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
    },
  })
);

// Routes
app.use('/api/user', authRoutes);
app.use("/api/books", bookRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});