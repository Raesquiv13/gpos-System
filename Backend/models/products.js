'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, default: 'No hay categoria' },
    description: String
})

//una vex el modelo ya esta creado, se necesita exportar para poder ser usado en otras clases
module.exports = mongoose.model('Products', ProductSchema)

