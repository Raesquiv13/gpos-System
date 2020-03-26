'use strict'

//imports necesarios para poner a correr el servicio y trabajar con la base de datos de mongo
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/products')


// Parametros generales del sistema
const port = process.env.PORT || 3000
const database = 'mongodb://127.0.0.1:27017/shop'




const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//-------------------------------------------------------------------------------------------
//lo anterios es requerido para poder inciar el servicio


//Despues de iniciar se colocan los verbos que se utilizan para un API REST

//GET
app.get('/api/products', (req, res) => {
  //al escribir {} en el parametro de find, le decimos al modelo que nos de todo los resultados que tiene guardados
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
    if (!products) return res.status(404).send({ message: `No existen productos` })

    res.status(200).send({ products })

  })
})



app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
    if (!product) return res.status(404).send({ message: `El producto no existe` })

    res.status(200).send({ product })
  })

})


//POST
app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)



  //se llena el modelo con los datos que vienen del request
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  //almacenar en la base de datos
  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` })

    res.status(200).send({ product: productStored })
  })
})



//PUT
app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update = req.body
  Product.findByIdAndUpdate(productId,update, (err,productUpdated)=>{
    if(err) return res.status(500).send({message:`Error al actualizar el producto: ${err}`})

    res.status(200).send({product: productUpdated})
  })
})




//DELETE
app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al borrar producto: ${err}` })

    product.remove(err => {
      if (err) return res.status(500).send({ message: `Error al borrar producto: ${err}` })

      res.status(200).send({ message: `El producto ha sido eliminado` })
    })

  })
})










//Requerido para iniciar la coneccion con la base de datos
mongoose.connect(database, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Conexion a la base de datos establecida...")


    //Requerido para levantar el servicio de los API
    app.listen(port, () => {
      console.log(`API REST corriendo en http:localhost:${port}`)
    })
  })
  .catch(err => {
    console.log(`Error al conectar a la base de datos ${err}`)
  });





