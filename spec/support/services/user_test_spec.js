var userService = require('../../../services/users')

describe('Validate email format', () => {
    it('Using a correct email', () => {
        var email = "ricardo@email.com"
        expect(userService.validateEmail(email)).toBeTrue()
    })

})