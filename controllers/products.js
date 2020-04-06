'use strict'
const Products = require('../models/products')
const Users = require('../models/users')

/**
 *** This function is used to: 
  * GET a product by ID.
  * The ID must be included in the parameter of the request.
  * 
  * 
 *** Information about parameters.
 ** @param req It is the request of the API.
  * The @var productId must be included in the request @var req.params.productId
  * 
  * 
 ** @param res It is what the API response.
  * If the @var productId match with some value of the data base (@var Products) 
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var product : {}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
  * 
**/
function getProduct(req, res) {
    let productId = req.params.productId

    Products.findById(productId, (err, product) => {
        if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product })
    })
}

/**
 *** This function is used to: 
  * GET all the products in the database.
  * 
  * 
 *** Information about parameters.
 ** @param req It is the request of the API.
  * 
  * 
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everythig is fine.
  * status : 200 
  * @var products : {list of products}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
  * 
**/
function getProducts(req, res) {
    //al escribir {} en el parametro de find, le decimos al modelo que nos de todo los resultados que tiene guardados
    Products.find({}, (err, products) => {
        if (err) return res.status(500).send(`Error al realizar la petición: ${err}`)
        if (!products) return res.status(404).send({ message: `No existen productos` })

        res.status(200).send({ products })

    })
}

/**
 *** This function is used to: 
  * GET the list of products by userOwner in the database.
  * First search the user by id.
  * Once system has the data of user, create the @var query to search all products based on it.
  * 
  * 
 *** Information about parameters.
 ** @param req It is the request of the API.
  * After authorization in the request @var req.user must be the id of the user,
  * System will storage the id in the variable  @var userOwnerId
  * 
  * 
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everythinng is fine.
  * status : 200 
  * @var products : {list of products}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err  * 
  * 
**/
function getProductListByUserOnwer(req, res) {
    
    let userOwnerId = req.user
    Users.findById(userOwnerId, (err, user) => {
        if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
        if (!user) return res.status(404).send({ message: `El usuario no existe` })

        //what the system needs to search, we use the userOwner that is a key of the JSOn of Product model
        var query = { "userOwner": user.email };

        Products.find(query, (err, products) => {
            if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
            if (!products) return res.status(404).send({ message: `No existen productos para el usuario ${userOwner}` })

            res.status(200).send({ products })
        })
    })
}

/**
 *** This function is used to: 
  * Save a product in the data base.
  *
  * 
 *** Information about parameters.
  ** @param req It is the request of the API.
  * To fill the @var Products model, all data come in the request.
  * The request contains all the values in the body @var req.body
  * 
  * 
  ** @param res It is what the API response.
  * The function will response:
  * 
  * If everythinng is fine.
  * status : 200 
  * @var product : {product data}
  * 
  * If something is wrong:
  * status : 500
  * Error al salvar en la base de datos: @var err  * 
  * 
  * 
**/
function saveProduct(req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    //se llena el modelo con los datos que vienen del request
    let product = new Products()
    product.userOwner = req.body.userOwner
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
}

/**
 *** This function is used to: 
  * Update a product by ID.
  * The ID must be included in the parameter of the request.
  * 
  * 
 *** Information about parameters.
 ** @param req It is the request of the API.
  * The @var productId must be included in the request @var req.params.productId
  * 
  * 
 ** @param res It is what the API response.
  * If the @var productId match with some value of the data base (@var Products) 
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var product : {Product value before update}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
  * 
**/
function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Products.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${err}` })

        res.status(200).send({ product: productUpdated })
    })
}

/**
 *** This function is used to: 
  * DELETE a product by ID.
  * The ID must be included in the parameter of the request.
  * 
  * 
 *** Information about parameters.
 ** @param req It is the request of the API.
  * The @var productId must be included in the request @var req.params.productId
  * 
  * 
 ** @param res It is what the API response.
  * If the @var productId match with some value of the data base (@var Products) 
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * El producto ha sido eliminado
  * 
  * If something is wrong:
  * status : 500
  * Error al borrar producto: @var err
  * 
  * 
**/
function deleteProduct(req, res) {
    let productId = req.params.productId

    Products.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al borrar producto: ${err}` })

        product.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar producto: ${err}` })

            res.status(200).send({ message: `El producto ha sido eliminado` })
        })

    })
}


module.exports = {
    getProduct,
    getProducts,
    getProductListByUserOnwer,
    saveProduct,
    updateProduct,
    deleteProduct
}