'use strict'
var userService = require('../../../../services/users')
const qaseApi = require('../../../support/Qase/API')
const testingConfig = require('../../../../spec/support/config/config')

describe('Validate email format', () => {
    it('Using a correct email', (done) => {
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        let startExecution = new Date().getTime()
        var testCaseResult = {
            "case_id": 11,
            "time": 0,
            "status": "",
            "member_id": 1,
            "comment": "",
            "defect": false,
            "steps": []
        }


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var email = "perroloco@email.com"
        var expectedResult = true

        //When:
        var actualResult = userService.validateEmail(email)
        var stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push(
            {
                "position": 1,
                "status": stepOneStatus == true ? "passed" : "failed",
                "comment": stepOneStatus == true
                    ? "Email validation was successfully"
                    : "Error, there are problems validating the email format with the value: " + email
            }
        )

        //Then:
        var status = stepOneStatus == true ? 'passed' : 'failed'


        //TEST CASE RESULT-----------------------------------------------------------------------------
        let endExecution = new Date().getTime()
        testCaseResult.time = endExecution - startExecution
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') { testCaseResult.comment = "Everything is working as expected" }
        else { testCaseResult.comment = "Error, There are problems validating the email format" }
        qaseApi.addNewTestRunResult(testingConfig.UNIT_TESTING_TEST_RUN_ID, testCaseResult,
            function (err, response) {
                expect(response.body.status).toBe(true)
                done()
            })

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

