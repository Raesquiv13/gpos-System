'use strict'

/**
 *** This function is used to: 
  * Validate that email has the correct format.
  * To verify the format, system is going to use a regex @var emailRegex
  * 
  * 
 *** Information about parameters.
 ** @param email It is the email value to be stored.
  * 
**/
function validateEmail(email) {
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if (emailRegex.test(email)) {
        return true
    } else {
        return false
    }
}


module.exports = {
    validateEmail
}