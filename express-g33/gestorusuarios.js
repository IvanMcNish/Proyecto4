const { response, request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb+srv://admin:admin@tallermisiontic.gw9hdnp.mongodb.net/bd_TallerTic?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usuarioSchema = new mongoose.Schema(
    {
        cedula: String,
        nombre: String,
        apellido: String,
        telefono: String,
        fechaNacimiento: String,
        contrasenia: String,
        correo: String,
        sede: String,
        ciudadResidencia: String,
    });

const UsuarioModelo = new mongoose.model('Usuarios', usuarioSchema);

app.post('/AgregarUsuario', (request, response) => {
    let usuario = new UsuarioModelo({
        cedula: request.body.cedula,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        telefono: request.body.telefono,
        fechaNacimiento: request.body.fechaNacimiento,
        contrasenia: request.body.contrasenia,
        correo: request.body.correo,
        sede: request.body.sede,
        ciudadResidencia: request.body.ciudadResidencia,
    });

    usuario.save(function (error, datos) {
        if (error) {
            console.log('Error');
            response.send("Uy hubo un error al crear un usuario");
        } else {
            console.log('Okkkkk');
            response.send("Gracias, has creado un usuario nuevo");
        }

    });
});

app.delete("/EliminarUsuario", (request, response) => {
    UsuarioModelo.deleteOne(
        { cedula: request.body.cedula },
        function (error, documento) {
            if (error) {
                response.send('Ups, ocurrio un error al eliminar el usuario');
            } else {
                response.send('El usuario ha sido eliminado');
            }

        }

    );

});

app.get("/UsuarioCedula", (request, response) => {
    const filtro = {
        cedula: request.body.cedula | request.query.cedula,
        nombre: request.body.nombre ? request.body.nombre : request.query.nombre,
    };
    
    UsuarioModelo.find(filtro, function (error, documentos) {
        if (error) {
            response.send("Ups, ocurrio un error");
        }else{
            response.send(documentos);
        }
    });

});

app.put("/EditarUsuario", (request, response) => {
    const filtro = {cedula: request.body.cedula};
    const datoNuevo = {nombre: request.body.nombre, edad: request.body.edad, apellido: request.body.apellido, telefono: request.body.telefono, fechaNacimiento: request.body.fechaNacimiento, contrasenia: request.body.contrasenia, correo: request.body.correo, sede: request.body.sede, ciudadResidencia: request.body.ciudadResidencia};

    UsuarioModelo.findOneAndUpdate(filtro, datoNuevo, function(error, documento){
        if(error){
            response.send('Error al editar');
        }else{
            response.send('El usuario fue editado exitosamente')
        }

    })
});

app.get("/AllUsers", (request, response) => {
    const filtro = {};
    
    UsuarioModelo.find(filtro, function (error, documentos) {
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

        