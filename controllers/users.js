'use strict'

const Users = require('../models/users')
const AuthorizationService = require('../services/authorization')
const usersService = require('../services/users')

/**
 *** This function is used to: 
  * Sign up a new user to have access to some private routes.
  * System should validate if the email has the correct format using @function validateEmail
  *
 *** Information about parameters.
  ** @param req It is the request of the API.
  * The values to fill the model @var Users come in the request body @var req.body
  * The model is stored in the variable @var user
  *
  * 
  *  @param res It is the response of the API.
  * The function will response:
  * 
  * If everything is ok.
  * status : 200 
  * @var token : {the Jason Web Token (JWY) that system generates.
  * 
  * If something is wrong:
  * status : 500
  * Error al crear usuario: @var err
  * 
  * If email has not the correct format.
  * status : 400
  * Error, formato de correo incorrecto
  * 
**/
function signUp(req, res) {

    if (usersService.validateEmail(req.body.email)) {
        const user = new Users({
            email: req.body.email,
            displayName: req.body.displayName,
            password: req.body.password
        })
        user.save((err) => {
            if (err) return res.status(500).send({ message: `Error al crear usuario: ${err}` })
            return res.status(200).send({ token: AuthorizationService.createToken(user) })
        })
    } else {
        return res.status(400).send({ message: `Error, formato de correo incorrecto` })
    }



}

/**
 *** This function is used to: 
  * Sign in an internal user to have access to some private routes.
  *
  * 
 *** Information about parameters.
  ** @param req It is the request of the API.
  * You need the @var email that comes in the request body @var req.body.email
  * to check in the data base if the user was already created.
  * 
  * 
  *  @param res It is the response of the API.
  * The function will response:
  * 
  * If everything is ok.
  * status : 200 
  * Te has logueado correctamente
  * @var token : {the Jason Web Token (JWY) that system generates.
  * 
  * If something is wrong:
  * status : 500
  * Error al solicitar email: @var err
  * 
**/
function signIn(req, res) {
    Users.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al solicitar email: ${err}` })
        if (!user) return res.status(404).send({ message: `No existe el usuario ${err}` })

        req.user = user[0]

        res.status(200).send({
            message: `Te has logueado correctamente`,
            token: AuthorizationService.createToken(user[0])
        })


    })
}

module.exports = {
    signUp,
    signIn
}