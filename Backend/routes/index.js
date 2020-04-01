'use strict'
//API 
const express = require('express')
const api = express.Router()

//imports de las clases que he creado
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')
const auth = require('../middlewares/auth')




//Products----------------------------------------------------------------------------------------------------

//GET
api.get('/products', ProductController.getProducts)
api.get('/products/:userOwner', ProductController.getProductsByUserOwner)
api.get('/product/:productId', ProductController.getProduct)

//POST
api.post('/product', ProductController.saveProduct)

//PUT
api.put('/product/:productId', ProductController.updateProduct)

//DELETE
api.delete('/product/:productId', ProductController.deleteProduct)


//Autenticacion para rutas privadas, se necesita agregar el middleware auth a la par de la ruta.
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: `Tienes acceso` })
})




//Users-------------------------------------------------------------------------------------------------

//POST
api.post('/signup', UserController.signUp)

api.post('/signin',UserController.signIn)


module.exports = api