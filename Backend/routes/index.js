'use strict'
//API 
const express = require('express')
const api = express.Router()

//imports de las clases que he creado
const auth = require('../middlewares/auth')
const ProductController = require('../controllers/products')
const UserController = require('../controllers/users')



//Products----------------------------------------------------------------------------------------------------

//GET
api.get('/products', ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)

//POST
api.post('/product', ProductController.saveProduct)

//PUT
api.put('/product/:productId', ProductController.updateProduct)

//DELETE
api.delete('/product/:productId', ProductController.deleteProduct)


//Autenticacion para rutas privadas, se necesita agregar el middleware auth a la par de la ruta.
api.get('/private', auth, function (req, res) {
    console.log("Id del usuario: " + req.user)
    res.status(200).send({ message: `Tienes acceso` })
})



//Private
//GET
api.get('/private/products', auth, ProductController.getProductListByUserOnwer)



//Users-------------------------------------------------------------------------------------------------

//POST
api.post('/signup', UserController.signUp)

api.post('/signin', UserController.signIn)


module.exports = api