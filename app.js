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


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000", // URL du client
    credentials: true, // Autoriser l'envoi des cookies
  })
);

// Middleware
app.use(cors()); // Pour autoriser les requêtes cross-origin
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
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://amalbenaissa:mongo_12345@cluster0.1qyk4.mongodb.net/BookClub`, 
    }),
  })
);

// Routes
app.use('/api/user', authRoutes);
app.use("/books", bookRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});