const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ServicioSchema = mongoose.Schema({
    tematica: String,
    fecha_init: Date,
    fecha_fin: Date,
    cupos: Number,
    cupos_disponibles: Number,
    estado: Number,
    usuario_creador : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    foto: Array,
    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Plato'
    }]
})

module.exports = mongoose.model("Servicio", ServicioSchema, "Servicio")