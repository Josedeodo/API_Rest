const express = require('express');
const Curso = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req, res)=>{
    res.json('Respuesta a petición GET de USUARIOS funcionando correctamente...');
});

module.exports = ruta;