const Plato = require('../models/Plato')

exports.getAllPlatos = async(req, res) => {
    try{
        const plato = await Plato.find({estado: 1});
        res.send(plato)
    } catch{
        res.status(404).send({error: "Error"})
    }
}

exports.createPlato = async(req, res) => {
    try{
        const plato = new Plato(req.body);
        plato.estado = 1
        await plato.save();
        res.send(plato);
    } catch{
        res.status(404).send({error: "Error"})
    }
}

exports.deletePlato = async(req, res) => {
    try{
        const plato = await Plato.findById(req.params.id);
        plato.estado = 2
        plato.save();
        res.send(plato);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}