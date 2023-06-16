const Servicio = require('../models/Servicio');
const Usuario = require('../models/Usuario')

exports.getAllServicios = async(req, res) =>{
    try {
        const servicio = await Servicio.find().populate('menu').exec();

        res.send(servicio);
    } catch{
        res.status(404).send({error: "Lista no encontrada"});
    }
}

exports.getServiciosPorFecha = async (req, res) => {
    const fechaConsulta = req.url.split("/")[2]; // Extraer la fecha de la ruta
    
    try {
      const servicios = await Servicio.aggregate([
        // Agregar un campo fecha con solo el año, mes y día de la fecha_init
        { $addFields: { fecha: { $dateToString: { format: "%Y-%m-%d", date: "$fecha_init" } } } },
        // Filtrar los servicios que tengan la misma fecha que la ruta
        { $match: { fecha: fechaConsulta } },
        // Poblar el campo menu con los datos de los platos
        { $lookup: { from: "Plato", localField: "menu", foreignField: "_id", as: "menu" } }
      ]);
      res.send(servicios);
    } catch(e) {
        console.log(e)
      res.status(404).send({ error: "Servicios no encontrados" });
    }
  }


  
  

exports.createServicios = async(req, res) =>{
    try{
        const servicio = new Servicio(req.body);
        servicio.cupos_disponibles = servicio.cupos
        servicio.estado = 1
        const usr = await Usuario.findById(servicio.usuario_creador);
        if (usr) {
            if(servicio.menu.length > 0) {
                await servicio.save();
                res.send(servicio);
            }  else {
                res.status(404).send({error: "Debe agregar al menos un plato"})
            }
        } else{
            res.status(404).send({error: "Usuario no encontrado"})
        }
        
    } catch(e){
        console.log(e)
        res.status(404).send({error: "Error"})
    }
}

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