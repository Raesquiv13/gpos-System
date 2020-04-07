var userService = require('../../../services/users')

describe('Validate email format', () => {
    it('Using a correct email', () => {
        var email = "perroloco@email.com"
        expect(userService.validateEmail(email)).toBeTrue()
    })

})