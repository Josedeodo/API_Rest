const Usuario = require('../models/usuario_model');
const Joi = require('@hapi/Joi');

//validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-zA-záéíóú ]{3,30}$/),

    password: Joi.string()
        .pattern(/^[A-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'edu', 'co']}})
});

//función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(usuariox){
    let usuario = new Usuario({
        email       : usuariox.email,
        nombre      : usuariox.nombre,
        password    : usuariox.password
    });
return await usuario.save();
}

//función asíncrona para actualizar usuario
async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate({"email":email},{
        $set: {
            nombre : body.nombre,
            password: body.password
        }
    }, {new: true});
    return usuario;
} 

//función asíncrona para inactivar un usuario
async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        }
    },{ new: true });
    return usuario;
}

//función asíncrona para listar todos los usuarios activos
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

module.exports = {
    schema,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}