'use strict'
const qaseApi = require('../../../Qase/API')
const testingConfig = require('../../../config/config')
const auth = require('../../../../../services/authorization')

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

describe('Create Json Web(JWT)', () => {
    console.log("Create Json Web(JWT)")
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

    it("Create JWT", function () {
        console.log("Create JWT")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 14
        testCaseResult.member_id = 1


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true
        var stepTwoActualResult = true
        var userStructure = {
            email: "automated-user@gmail.com",
            displayName: "Automated user",
            password: "asdf4321"
        }
        var tokenGenerated = ""
        var tokenSection = []
        var stepTwoStatus = true
        var status = 'passed'


        //When:
        testCaseResult.steps.push({
            "position": 1,
            "status": "passed",
            "comment": "User variable was created successfully"
        })

        tokenGenerated = auth.createToken(userStructure)
        tokenSection = tokenGenerated.split('.')
        stepTwoActualResult = tokenSection.length == 3
        stepTwoStatus = stepTwoActualResult == expectedResult
        testCaseResult.steps.push({
            "position": 2,
            "status": stepTwoStatus == true ? "passed" : "failed",
            "comment": stepTwoStatus == true ?
                "The three sections were created as expected" : "Error, there are problems creating token: " + tokenGenerated
        })


        //Then:
        expect(stepTwoStatus).toBe(true)
        status = stepTwoStatus == true ? 'passed' : 'failed'



        //TEST CASE RESULT-----------------------------------------------------------------------------
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') {
            testCaseResult.comment = "Everything is working as expected"
        } else {
            testCaseResult.comment = "Error, There are problems validating token creation"
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