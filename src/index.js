const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');



const express = require('express');
const mongoose = require('mongoose');

//conexión a la base de datos mongodb
mongoose
  .connect('mongodb+srv://root:Qwerty@cluster0.f99qsbp.mongodb.net/usercoursesdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión correcta con mongo db'))
  .catch((err) => console.log('no se pudo conectar con mongo db...', err));

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//end points (recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Api REST Ok, y ejecutándose...');
})