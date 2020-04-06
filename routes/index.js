'use strict'

const express = require('express')
const api = express.Router()

const auth = require('../middlewares/auth')
const ProductController = require('../controllers/products')
const UserController = require('../controllers/users')


/*************************************************************************
 * @module PRODUCTS 
 * 
**/


/**
 * * This API provide us:
 * The list of products stored in the data base.
 * 
 * API REST method
 * @method GET
 * 
 * URL request
 * @var URL = /products
 * 
**/
api.get('/products', ProductController.getProducts)


/**
 * * This API provide us:
 * A specific product by ID.
 * 
 * API REST method
 * @method GET
 * 
 * URL request
 * @var URL = /product/:productId
 * 
**/
api.get('/product/:productId', ProductController.getProduct)


/**
 * * This API provide us:
 * The list of products by userOwner, using the middleware to authenticate.
 * 
 * API REST method
 * @method GET
 * 
 * URL request
 * @var URL = /private/products
 * 
 * Middleware to authenticate
 * @var auth
 * 
**/
api.get('/private/products', auth, ProductController.getProductListByUserOnwer)


/**
 * * This API provide us:
 * The capability to storage a product in the data base.
 * 
 * API REST method
 * @method POST
 * 
 * URL request
 * @var URL = /product
 * 
**/
api.post('/product', ProductController.saveProduct)


/**
 * * This API provide us:
 * The funtionality of update the data of a product already saved in the database
 * using the ID as the reference.
 * 
 * API REST method
 * @method PUT
 * 
 * URL request
 * @var URL = /product/:productId
 * 
**/
api.put('/product/:productId', ProductController.updateProduct)


/**
 * * This API provide us:
 * The funtionality of delete a product already saved in the database
 * using the ID as the reference.
 * 
 * API REST method
 * @method DELETE
 * 
 * URL request
 * @var URL = /product/:productId
 * 
**/
api.delete('/product/:productId', ProductController.deleteProduct)


/*************************************************************************************
 * @module USERS 
 * 
**/

/**
 * * This API provide us:
 * The token required to the private routes, system will be able to create
 * a new user in the data base.
 * 
 * 
 * API REST method
 * @method POST
 * 
 * URL request
 * @var URL = /signup
 * 
**/
api.post('/signup', UserController.signUp)


/**
 * * This API provide us:
 * The token required to the private routes, system will be able to check
 * if the user was already created in the data base.
 * 
 * 
 * API REST method
 * @method POST
 * 
 * URL request
 * @var URL = /signin
 * 
**/
api.post('/signin', UserController.signIn)



module.exports = api