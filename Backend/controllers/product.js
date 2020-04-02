'use strict'
const Products = require('../models/products')
const Users = require('../models/user')


function getProduct(req, res) {
    let productId = req.params.productId

    Products.findById(productId, (err, product) => {
        if (err) return res.status(500).send(`Error al realizar la peticion: ${err}`)
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product })
    })
}


function getProducts(req, res) {
    //al escribir {} en el parametro de find, le decimos al modelo que nos de todo los resultados que tiene guardados
    Products.find({}, (err, products) => {
        if (err) return res.status(500).send(`Error al realizar la petición: ${err}`)
        if (!products) return res.status(404).send({ message: `No existen productos` })

        res.status(200).send({ products })

    })
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getProductListByUserOnwer(req, res) {
    
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
}





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


function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Products.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${err}` })

        res.status(200).send({ product: productUpdated })
    })
}

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