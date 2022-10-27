const { response, request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb+srv://admin:admin@tallermisiontic.gw9hdnp.mongodb.net/bd_TallerTic?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const vehiculoSchema = new mongoose.Schema(
    {
        placa: String,
        propietario: String,
        tipo: String,
        marca: String,
        anio: String,
        capacidadPasajeros: String,
        cilindraje: String,
        paisOrigen: String,
        accesorios: String,
    });

const VehiculoModelo = new mongoose.model('vehiculos', vehiculoSchema);

app.post('/AgregarVehiculo', (request, response) => {
    let vehiculo = new VehiculoModelo({
        placa: request.body.placa,
        propietario: request.body.propietario,
        tipo: request.body.tipo,
        marca: request.body.marca,
        anio: request.body.anio,
        capacidad: request.body.capacidad,
        cilindraje: request.body.cilindraje,
        paisOrigen: request.body.paisOrigen,
        accesorios: request.body.accesorios,
    });

    vehiculo.save(function (error, datos) {
        if (error) {
            console.log('Error');
            response.send("Uy hubo un error al registrar el vehiculo");
        } else {
            console.log('Okkkkk');
            response.send("Gracias, has registrado tu vehiculo exitosamente");
        }

    });
});

app.delete("/EliminarVehiculo", (request, response) => {
    VehiculoModelo.deleteOne(
        {placa: request.body.placa},
        function (error, documento) {
            if (error) {
                response.send('Ups, ocurrio un error al eliminar el vehiculo');
            } else {
                response.send('El vehiculo ha sido eliminado');
            }

        }

    );

});

app.get("/VehiculoPlaca", (request, response) => {
    const filtro = {
        placa: request.body.placa
    };
    VehiculoModelo.find(filtro, function (error, documentos) {
        if (error) {
            response.send("Ups, ocurrio un error");
        }else{
            response.send(documentos);
        }
    });

});

app.put("/EditarVehiculo", (request, response) => {
    const filtro = {placa: request.body.placa};
    const datoNuevo = {placa: request.body.placa,
        propietario: request.body.propietario,
        tipo: request.body.tipo,
        marca: request.body.marca,
        anio: request.body.anio,
        capacidad: request.body.capacidad,
        cilindraje: request.body.cilindraje,
        paisOrigen: request.body.paisOrigen,
        accesorios: request.body.accesorios,};

    VehiculoModelo.findOneAndUpdate(filtro, datoNuevo, function(error, documento){
        if(error){
            response.send('Lo siento, hubo un error al editar los datos');
        }else{
            response.send('El vehiculo fue editado exitosamente')
        }

    })
});

app.get("/AllVehicles", (request, response) => {
    const filtro = {};
    
    VehiculoModelo.find(filtro, function (error, documentos) {
        if (error) {
            response.send("Ups, ocurrio un error");
        }else{
            response.send(documentos);
        }
    });

});




        app.get('/', (request, response) => {
            response.send("<h1 style='color:red'>Bienvenidos a la ruta raiz</h1>");
        });

        app.get('/inicio', (request, response) => {
            response.send('Hola Grupo 33');
        });

        app.get('/opciones', (request, response) => {
            response.send('Estas son tus opciones');
        });

        app.listen(3000, () => {
            console.log('Servidor escuchando...')

        });