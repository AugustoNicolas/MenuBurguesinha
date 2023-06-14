const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReservaSchema = mongoose.Schema({
    usuario : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    servicio : {
        type: Schema.Types.ObjectId,
        ref: 'Servicio'
    },
    fecha: Date,
    cupos: Number,
    estado: Number


})

module.exports = mongoose.model("Reserva", ReservaSchema, "Reserva")