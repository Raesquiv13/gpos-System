'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

//libreria para encriptar
const bcrypt = require('bcrypt-nodejs')


//modelo de base de datos
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})


//Esta funcion es para trabajar antes de crear el modelo
userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    // funcion para encryptar el password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })

    })
})


//Para agregar un avatar, utilizara el del correo que se utilice o si no tiene le agregara uno por defecto
userSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('user', userSchema)