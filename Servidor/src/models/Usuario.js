const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    id_google: String,
    email: String,
    name: String,
    apellido: String,
    cell: String,
    is_Admin: Boolean,
    is_anfitrion: Boolean,
    estado: Number,
    picture: String
})

module.exports = mongoose.model("Usuario", UsuarioSchema, "Usuario")