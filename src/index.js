const express = require('express');
const mongoose = require('mongoose');

//conexión a la base de datos mongodb
mongoose
  .connect('mongodb://127.0.0.1:27017/userscoursesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión correcta con mongo db'))
  .catch((err) => console.log('no se pudo conectar con mongo db...', err));

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Api REST Ok, y ejecutándose...');
})