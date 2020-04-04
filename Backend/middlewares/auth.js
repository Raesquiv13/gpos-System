'use strict'

const Service = require('../services')

/**
 *** This function is used to: 
  * Give access to a private route based on JaSON Web Token(JWT).
  * The function decode the @var token based on some JWT standards.
  *  
  *
 *** Information about parameters.
  ** @param req It is the request of the API.
  * Here comes the @var req.headers.authorization that is the @var token of an already created user.
  * 
  * 
  * @param res It is the response of the API.
  * If something is wrong, system goes to the @method catch and it will response with
  * the status of the error.
  * 
  * @param next It is to, once the @function decodeToken is solved, response @var response
  * with the id of the user in the request @var req.user
  * 
  * 
**/
function isAuth(req, res, next) {
    //verifica si existe autorizacion
    if (!req.headers.authorization) {
        return res.status(403).send({ message: `No tienes autorizacion` })
    }

    //Toma el token y lo decodifica
    const token = req.headers.authorization.split(" ")[1]
    Service.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })


}

module.exports = isAuth