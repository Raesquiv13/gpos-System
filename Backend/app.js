'use strict'

//imports necesarios para poner a correr el servicio 
const express = require('express')
const bodyParser = require('body-parser')

// requerido para poder inciar el servicio
const app = express()

//imports de las clases que he creado
const api = require('./routes')

//Configuracion para que convierta el cuerpo del request en formato JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//API REST
app.use('/api', api)





module.exports = app


