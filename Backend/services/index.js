'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


/**
 *** This function is used to: 
  * Create the JSON Web Token.
  * To complete with the standard, is required to create the @var payload
  * that contains @var sub that represents the user ID,
  * @var iat that represents the date of creation,
  * @var exp that represents the expiration date of the token.
  * 
  * 
  * A secrete value @var config.SECRET_TOKEN is required to confirm the token.
  * 
 *** Information about parameters.
 ** @param user It is the objet user that contains all the values of the user.
  * 
**/
function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

/**
 *** This function is used to: 
  * decode the JSON Web Token.
  * A @function Promise is required to reuse the function in others part of the project.
  * System needs to get back the payload based on token.
  * System will check the expiration date,
  * If the token stil works, system will send the user ID. 
  * 
  * 
  * A secrete value @var config.SECRET_TOKEN is required to confirm the token.
  * 
 *** Information about parameters.
 ** @param token
  * 
**/
function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            //verifica que no haya caducado
            if (payload.exp <= moment.unix()) {
                reject({
                    status: 401,
                    message: `El token ha expirado`
                })
            }

            resolve(payload.sub)

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}