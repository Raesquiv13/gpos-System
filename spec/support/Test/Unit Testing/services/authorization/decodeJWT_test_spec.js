'use strict'
const qaseApi = require('../../../../../support/Qase/API')
const testingConfig = require('../../../../config/config')
const auth = require('../../../../../../services/authorization')
const testData = require('../authorization/testData')

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



describe('Decode JWT', () => {
    console.log("Decode JWT")
    if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "true") {
        beforeEach(function () {
            startExecution = new Date().getTime()
            //Extend the time to wait, sometime Qase needs more time
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
            //The variable testCaseResult needs to be resetted for each new test
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


    it("Using a valid token", async function () {
        console.log("Using a valid token")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 15
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var token = testData.TOKEN
        var userId
        var decodedMessage = ""


        //When:
        await auth.decodeToken(token)
            .then(response => {
                userId = response
                actualResult = userId == "automatedUserId" ? true : false
            })
            .catch(response => {
                decodedMessage = response.message
                actualResult = false
            })

        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Token was decoded successfully" : "Error, there are problems decoding the token: " + decodedMessage
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
            testCaseResult.comment = "Error, There are problems decoding the token"
        }
    })


    it("Using a token already expired", async function () {
        console.log("Using a token already expired")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 16
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZThiYTZmMDU2YzU0YTAwMDQxYzIzMTgiLCJpYXQiOjE1ODcxNzE1MTYsImV4cCI6MTU4ODM4MTExNn0.HS-x6YXucOYc9nW2r7gV1SsuhRMDcUAA1Sl2sGpi3q8"
        var decodedMessage = ""


        //When:
        await auth.decodeToken(token)
            .then(response => {
                decodedMessage = response.message
                console.log("System should shows an error message")
                actualResult = false
            })
            .catch(response => {
                if (response.status == 401 && response.message == "El token ha expirado") {
                    actualResult = true
                } else {
                    actualResult = false
                }
            })

        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Validation was successfully" : "Error, validation was not as expected \n message: " + decodedMessage
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
            testCaseResult.comment = "Error, system didn't receive the expected message"
        }
    })


    it("Using an invalid token", async function () {
        console.log("Using an invalid token")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 17
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIdWIiOiI1ZThiYTZmMDU2YzU0YTAwMDQxYzIzMTgiLCJpYXQiOjE1ODcxNzE1MTYsImV4x6YXucOYc9nW2r7gV1SsuhRMDcUAA1Sl2sGpi3q8"
        var decodedMessage = ""


        //When:
        await auth.decodeToken(token)
            .then(response => {
                decodedMessage = response.message
                console.log("System should shows an error message: " + decodedMessage)
                actualResult = false
            })
            .catch(response => {
                if (response.status == 500 & response.message == "Invalid Token") {
                    actualResult = true
                } else {
                    actualResult = false
                }
            })

        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Validation was successfully" : "Error, validation was not as expected \n message: " + decodedMessage
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
            testCaseResult.comment = "Error, system didn't receive the expected message"
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