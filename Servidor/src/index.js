const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const platoController = require('./controllers/plato')
const usuarioController = require('./controllers/usuario')
const servicioController = require('./controllers/servicio')
const reservaController = require('./controllers/reserva')

mongoose.connect('mongodb://localhost:27017/Dossier',
{useNewUrlParser: true})
.then(() => {
    const app= express();
    app.use(cors());
    app.options('*', cors());
    app.use(express.json());

    app.get("/plato", platoController.getAllPlatos)
    app.post("/plato", platoController.createPlato)
    app.delete("/plato/:id", platoController.deletePlato)

    app.get("/usuario", usuarioController.getAllUsuarios)
    app.post("/usuario", usuarioController.createUsuario)
    app.delete("/usuario/:id", usuarioController.deleteUsuario)
    app.post("/usuario/getC", usuarioController.get_and_create_Usuarios)

    app.get("/servicio", servicioController.getAllServicios)
    app.get("/servicio/:fecha", servicioController.getServiciosPorFecha)
    app.post("/servicio", servicioController.createServicios)
    app.get('/servicio/mes/:mes', servicioController.getServiciosByMonth);
    app.delete("/servicio/:id", servicioController.deleteServicios)

    app.get("/reserva", reservaController.getAllReserva)
    app.get("/reserva/:id", reservaController.getAllReservaByClient)
    app.get("/reservaDate/:id", reservaController.getReservasForClientAndDateToday)
    app.post("/reserva", reservaController.createReserva)
    app.patch("/reserva/aceptar/:id", reservaController.aceptReserva)
    app.patch("/reserva/negar/:id", reservaController.DeniegReserva)
    app.delete("/reserva/:id", reservaController.cancelReserva)

    

    app.listen(8005, () => {
        console.log("Al aireeeeee");
    });
})
.catch(() =>{
    console.log("hubo un error xd")
})