// Roep de database aan
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Gegevens die nodig zijn om een account aan te maken
const Users = new Schema({
    voornaam: {
        type: String,
        required: true,
    },
    achternaam: {
        type: String,
        required: true,
    },
    gebruikersnaam: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", Users);
module.exports = User;