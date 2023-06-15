const Usuario = require('../models/Usuario');

exports.getAllUsuarios = async(req, res) =>{
    try {
        const usuario = await Usuario.find();
        res.send(usuario);
    } catch{
        res.status(404).send({error: "Lista no encontrada"})
    }
}

exports.get_and_create_Usuarios = async (req, res) => {
    try {
      let usuario = await Usuario.findOne({ id_google: req.body.id });
      if (!usuario) {
        usr = {
          id_google: req.body.id,
          is_Admin: false,
          is_anfitrion: false,
          estado: 1,
          email: req.body.email,
          name: req.body.name,
          picture: req.body.picture,
        };
        usuario = new Usuario(usr);
        console.log(usuario)
      } else {
        usuario.id_google = req.body.id;
        usuario.email = req.body.email;
        usuario.name = req.body.name;
        usuario.picture = req.body.picture;
      }
      console.log(usuario.picture)
      await usuario.save();
      console.log(usuario)
      res.send(usuario);
    } catch (e) {
      res.status(404).send({ error: e });
    }
  };
  


exports.createUsuario = async(req, res) =>{
    try{
        const usuario = new Usuario(req.body);
        usuario.estado = 1
        usuario.is_Admin = false        
        usuario.is_anfitrion = false
        await usuario.save();
        res.send(usuario);
    } catch{
        res.status(404).send({error: "Error"})
    }
}

exports.deleteUsuario = async(req, res) => {
    try{
        const estado = await Usuario.findById(req.params.id);
        estado.estado = 2
        estado.save();
        res.send(estado);
    }catch{
        res.status(404).send({error: "No se pudo completar la accion"})
    }
}