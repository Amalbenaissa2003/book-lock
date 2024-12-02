const mongoose= require ('mongoose');
const dotenv=require('dotenv');
//const uri = process.env.URI_MONGODB;
const uri =`mongodb+srv://amalbenaissa:mongo_12345@cluster0.1qyk4.mongodb.net/BookClub`;

const connectDB = async() =>{
    try{
        await mongoose.connect(uri)
        .then(()=> console.log("Established a connection to the database"))
        .catch(err => console.log("Something went wrong when connecting to the database",err));
    }catch (error){
        console.error('Erreur de cconnexion à MongoDB : ',error.message);
        process.exit(1);
    }
};

module.exports= connectDB;