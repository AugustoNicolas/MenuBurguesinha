const mongoose = require('mongoose');

const PlatoScheme = mongoose.Schema({
    nombre: String,
    detalle: String,
    estado: Number,
    foto: String
})

module.exports = mongoose.model("Plato", PlatoScheme, "Plato")