const express = require('express');
const Usuario = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();

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

// Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/',(req,res)=>{
    let body = req.body;
    console.log(body)

    const {error, value} = schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        })
    }
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

module.exports = ruta