'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const Service = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.email,
        displayName: req.displayName
    })

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear usuario: ${err}` })

        return res.status(200).send({ token: service.createToken(user)})
    })
}

function signIn() {

}

module.exports = {
    signUp,
    signIn
}