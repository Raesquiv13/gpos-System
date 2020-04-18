'use strict'
'use strict'
const userService = require('../../../../../services/users')
const qaseApi = require('../../../Qase/API')
const testingConfig = require('../../../config/config')

var testCaseResult = {
    "case_id": 0,
    "time": 0,
    "status": "",
    "member_id": 0,
    "comment": "",
    "defect": false,
    "steps": []
}

let startExecution

describe('Validate email format', () => {
    console.log("Validate email format")
    if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "true") {
        beforeEach(function () {
            startExecution = new Date().getTime()
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
            testCaseResult = {
                "case_id": 0,
                "time": 0,
                "status": "",
                "member_id": 0,
                "comment": "",
                "defect": false,
                "steps": []
            }
        })
    }

    it('Using a correct email', function () {
        console.log("Using a correct email")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 11
        testCaseResult.member_id = 1


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var email = "perroloco@email.com"
        var actualResult = true
        var stepOneStatus = true
        var status = 'passed'

        //When:
        actualResult = userService.validateEmail(email)
        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Email validation was successfully" : "Error, there are problems validating the email format with the value: " + email
        })

        //Then:
        expect(stepOneStatus).toBe(true)
        status = stepOneStatus == true ? 'passed' : 'failed'


        //TEST CASE RESULT-----------------------------------------------------------------------------
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') {
            testCaseResult.comment = "Everything is working as expected"
        } else {
            testCaseResult.comment = "Error, There are problems validating the email format"
        }
    })


    it('Using a incorrect email', () => {
        console.log("Using a incorrect email")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 12
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = false
        var email = "el perro loco "
        var actualResult = false
        var stepOneStatus = false
        var status = 'failed'

        //When:
        actualResult = userService.validateEmail(email)
        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Email validation was successfully" : "Error, there are problems validating email: " + email
        })

        //Then:
        expect(stepOneStatus).toBe(true)
        status = stepOneStatus == true ? 'passed' : 'failed'


        //TEST CASE RESULT-----------------------------------------------------------------------------
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') {
            testCaseResult.comment = "Everything is working as expected"
        } else {
            testCaseResult.comment = "Error, There are problems validating emai: " + email
        }
    })


    it('Using a list of different emails', () => {
        console.log("Using a list of different emails")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 13
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var actualResult
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
        var validationList = []
        var stepOneStatus = true
        var status = 'passed'

        
        //When:
        emailList.forEach(email => {
            actualResult = userService.validateEmail(email)
            validationList.push(actualResult)
        });


        validationList.forEach(result => {
            if (result != expectedResult) {
                stepOneStatus = false
            }
        })

        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Email validation was successfully" : "Error, there are problems validating data: "
        })

        //Then:
        expect(stepOneStatus).toBe(true)
        status = stepOneStatus == true ? 'passed' : 'failed'


        //TEST CASE RESULT-----------------------------------------------------------------------------
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') {
            testCaseResult.comment = "Everything is working as expected"
        } else {
            testCaseResult.comment = "Error, There are problems validating data"
        }
    })

    if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "true") {
        afterEach(function (done) {
            let endExecution = new Date().getTime()
            testCaseResult.time = endExecution - startExecution
            qaseApi.addNewTestRunResult(testingConfig.UNIT_TESTING_TEST_RUN_ID, testCaseResult,
                function (err, response) {
                    if (err) {
                        console.log("Error, adding automatic results to Qase.")
                        console.log(err)
                    } else if (response.statusCode == 200) {
                        if (response.body.status == false) {
                            console.log("Error, Qase API response status 200 but there is an error included in the response body.")
                            console.log(response.body)
                        } else {
                            console.log("Automatic results was added to Qase successfully.")
                        }
                    } else {
                        console.log("Error, there are unknow issues adding automatic results to Qase.")
                        console.log("Status code: " + response.statusCode)
                        console.log("message:")
                        console.log(response.body.message)
                    }
                    done()
                })
        })
    }
})