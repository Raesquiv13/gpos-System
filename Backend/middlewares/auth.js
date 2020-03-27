'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth(req, res, next) {
    //verifica si existe autorizacion
    if (!req.headers.authorization) {
        return res.status(403).send({ message: `No tienes autorizacion` })
    }

    //Toma el token y lo decodifica
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.encode(token, config.SECRET_TOKEN)

    //verifica que no haya caducado
    if(payload.exp <= moment.unix()){
        return res.status(401).send({message:`El token ha expirado`})
    }


    //Asigna el usuario
    req.user = payload.sub
    next()
}

module.exports = isAuth