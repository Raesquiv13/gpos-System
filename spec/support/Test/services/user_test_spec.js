var userService = require('../../../../services/users')

describe('Validate email format', () => {
    it('Using a correct email', () => {
        //Given:
        var email = "perroloco@email.com"
        var expectedResult = true
        
        //When:
        var actualResult = userService.validateEmail(email)
        
        //Then:
        expect(actualResult).toBe(expectedResult)
    })

    it('Using a incorrect email', () => {
        //Given:
        var email = "perro loco de la casa"
        var expectedResult = false
        
        //When:
        var actualResult = userService.validateEmail(email)
        
        //Then:
        expect(actualResult).toBe(expectedResult)
    })

    it('Using a list of different emails', () => {
        //Given:
        var emailList = [
            "forsberg@yahoo.com",
            "pkilab@icloud.com",
            "kludge@gmail.com",
            "lstein@hotmail.com",
            "carroll@mac.com",
            "demmel@me.com",
            "joelw@outlook.com",
            "rhavyn@comcast.net",
            "arachne@msn.com"
        ]
        var expectedResult = true
        var actualResult
        var validationList = []

        //When:
        emailList.forEach(email => {
            actualResult = userService.validateEmail(email)
            validationList.push(actualResult)
        });

        //Then
        validationList.forEach(result => {
            expect(result).toBe(expectedResult)

        })
    })

})