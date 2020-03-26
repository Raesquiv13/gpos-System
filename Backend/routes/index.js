'use strict'
//API 
const express = require('express')
const api = express.Router()

//imports de las clases que he creado
const ProductController = require('../controllers/product')


//GET
api.get('/products', ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)

//POST
api.post('/product', ProductController.saveProduct)

//PUT
api.put('/product/:productId', ProductController.updateProduct)

//DELETE
api.delete('/product/:productId', ProductController.deleteProduct)


module.exports = api