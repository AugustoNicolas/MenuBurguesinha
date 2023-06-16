const Servicio = require('../models/Servicio');
const Usuario = require('../models/Usuario')

exports.getAllServicios = async(req, res) =>{
    try {
        const servicio = await Servicio.find().populate('menu');
        res.send(servicio);
    } catch{
        res.status(404).send({error: "Lista no encontrada"});
    }
}

exports.createServicios = async(req, res) =>{
    try{
        const servicio = new Servicio(req.body);
        servicio.cupos_disponibles = servicio.cupos
        servicio.estado = 1
        //const usr = await Usuario.findById(servicio.usuario_creador);
        //if (usr) {
        //    if(servicio.menu.length > 0) {
                await servicio.save();
                res.send(servicio);
        //    }  else {
        //        res.status(404).send({error: "Debe agregar al menos un plato"})
         //   }
        //} else{
        //    res.status(404).send({error: "Usuario no encontrado"})
        //}
        
    } catch(e){
        console.log(e)
        res.status(404).send({error: "Error"})
    }
}
exports.getServiciosByMonth = async (req, res) => {
    try {
      const mes = parseInt(req.params.mes);
      const servicios = await Servicio.find({
        fecha_init: {
          $gte: new Date(new Date().getFullYear(), mes - 1, 1),
          $lt: new Date(new Date().getFullYear(), mes, 1)
        }
      }).populate('menu');
  
      res.send(servicios);
    } catch (error) {
      res.status(404).send({ error: "No se pudieron obtener los servicios filtrados por mes" });
    }
  };
  
exports.deleteServicios = async(req, res) => {
    try{
        const servicio = await Servicio.findById(req.params.id);
        servicio.estado = 2
        servicio.save();
        res.send(servicio);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}