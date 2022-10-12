const Curso = require('../models/curso_model');

//función asíncrona para listar los cursos activos
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

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

//función asíncrona para inactivar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set:{
            estado: false
        }
    },{new: true});
    return curso;
}

module.exports = {    
    listarCursosActivos,
    crearCurso,
    actualizarCurso,
    desactivarCurso
}