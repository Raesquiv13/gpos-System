'use strict'

//imports necesarios para poner a correr el servicio y trabajar con la base de datos de mongo
const mongoose = require('mongoose')
const app = require('./app')

// Parametros generales del sistema
const config = require('./config')

//Requerido para iniciar la coneccion con la base de datos
mongoose.connect(config.db, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Conexion a la base de datos establecida...")
    //Requerido para levantar el servicio de los API
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http:localhost:${config.port}`)
    })
  })
  .catch(err => {
    console.log(`Error al conectar a la base de datos ${err}`)
  });





