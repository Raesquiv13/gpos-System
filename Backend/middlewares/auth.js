'use strict'

const service = require('../services')

function isAuth(req, res, next) {
    //verifica si existe autorizacion
    if (!req.headers.authorization) {
        return res.status(403).send({ message: `No tienes autorizacion` })
    }

    //Toma el token y lo decodifica
    const token = req.headers.authorization.split(" ")[1]

    service.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })


}

module.exports = isAuth