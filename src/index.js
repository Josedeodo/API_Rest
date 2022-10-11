const express = require('express');
const mongoose = require('mongoose');

//conexión a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/userscoursedb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB', err));

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Api REST Ok, y ejecutándose...');
})