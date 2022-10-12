const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

//función asíncrona para listar los cursos activos
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

ruta.get('/', (req, res)=>{
    let resultado = listarCursosActivos();
    resultado.then(cursos =>{
        res.json(cursos)
    }).catch(err =>{
        res.status(400).json(err)
    })
});

//función asíncrona para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo      : body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
}

//End point de tipo POST para el recurso CURSOS
ruta.post('/',(req, res)=>{
    let resultado = crearCurso(req.body);
    resultado.then(curso =>{
        res.json({
            curso
        })
    }).catch(err =>{
        res.status(400).json({
            err
        })
    })
});

//función asíncrona para actualizar cursos
async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    },{new: true});
    return curso;
}

//End point de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req,res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso =>{
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
})

//función asíncrona para inactivar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set:{
            estado: false
        }
    },{new: true});
    return curso;
}

//End point de tipo DELETE para el recurso CURSOS
ruta.delete('/:id', (req, res)=>{
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err =>{
        res.status(400).json(err);
    })
})



module.exports = ruta;