const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const Servicio = require('../models/Servicio')

exports.getAllReserva = async(req, res) =>{
    try {
        const reserva = await Reserva.find().populate('usuario').populate('servicio');
        res.send(reserva);
    } catch{
        res.status(404).send({error: "Lista no encontrada"});
    }
}
exports.getAllReservaByClient = async (req, res) => {
    try {
        const usuarioId = req.params.id; // Obtener el ID del usuario de req.params

        const reserva = await Reserva.find({ usuario: usuarioId })
            .populate('usuario')
            .populate('servicio');

        res.send(reserva);
    } catch (error) {
        res.status(404).send({ error: "Lista no encontrada" });
    }
}
exports.getReservasForClientAndDateToday = async (req, res) => {
    try {
      const usuarioId = req.params.id;
  
      // Obtener la fecha actual sin la hora
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  
      const reserva = await Reserva.find({
        usuario: usuarioId,
        'servicio.fecha_init': { $gte: today, $lt: tomorrow }
      })
        .populate('usuario')
        .populate('servicio');
  
      res.send(reserva);
    } catch (error) {
      res.status(404).send({ error: "Lista no encontrada" });
    }
  };
  
  


exports.createReserva = async(req, res) =>{
    try{
        console.log(req.body)
        const reserva = new Reserva(req.body);
        reserva.cupos_disponibles = reserva.cupos
        reserva.estado = 1
        const usr = await Usuario.findById(reserva.usuario);
        const ser = await Servicio.findById(reserva.servicio).populate('menu');
        console.log(usr)
        console.log(ser)
        if (usr && ser) {
            ser.cupos_disponibles = ser.cupos_disponibles - reserva.cupos
            ser.save();
            if(ser.menu.length > 0) {
                await reserva.save();
                res.send(reserva);
            }  else {
                res.status(404).send({error: "Debe agregar al menos un plato"})
            }
        } else{
            res.status(404).send({error: "Usuario o servicio no encontrado"})
        }
        
    } catch(e){
        console.log(e)
        res.status(404).send({error: "Error"})
    }
}

exports.aceptReserva = async(req, res) => {
    try{
        const reserva = await Reserva.findById(req.params.id);
        reserva.estado = 2
        reserva.save();
        res.send(reserva);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}
exports.DeniegReserva = async(req, res) => {
    try{
        const reserva = await Reserva.findById(req.params.id);
        reserva.estado = 3
        reserva.save();
        res.send(reserva);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}
exports.cancelReserva = async(req, res) => {
    try{
        const reserva = await Reserva.findById(req.params.id);
        reserva.estado = 4
        reserva.save();
        res.send(reserva);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}