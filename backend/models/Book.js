const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true,
        unique: true, 
        minlength: 3,
        
    },
    description :{
        type: String,
        required:true,
        minlength:5,
    }, 
    image: {
        type: String, 
        required: true, 
    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // ID de l'utilisateur ayant créé le livre
    },
    favorites:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // ID des utilisateurs qui ont favorisé le livre
    }], 
},{ timestamps: true });

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;