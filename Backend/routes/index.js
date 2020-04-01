'use strict'
//API 
const express = require('express')
const api = express.Router()

//imports de las clases que he creado
const auth = require('../middlewares/auth')
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')


//tobe delete
const Products = require('../models/products')
const Users = require('../models/user')






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
api.get('/private', auth, function (req, res) {
    console.log("Id del usuario: " + req.user)
    res.status(200).send({ message: `Tienes acceso` })
})



//Private
//GET
api.get('/private/products', auth, function (req, res) {

    let userOwnerId = req.user
    Users.findById(userOwnerId, (err, user) => {
        if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
        if (!user) return res.status(404).send({ message: `El usuario no existe` })

        //what the system needs to search, we user the userOwner that is a key of the JSOn of Product model
        var query = { "userOwner": user.email };

        Products.find(query, (err, products) => {
            if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
            if (!products) return res.status(404).send({ message: `No existen productos para el usuario ${userOwner}` })

            res.status(200).send({ products })
        })



    })



})



//Users-------------------------------------------------------------------------------------------------

//POST
api.post('/signup', UserController.signUp)

api.post('/signin', UserController.signIn)


module.exports = api