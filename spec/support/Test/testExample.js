'use strict'
const qaseApi = require('../../../Qase/API')
const testingConfig = require('../../../config/config')

// The variable testCaseResult needs to be created eventhough test case will not be reported.
var testCaseResult = {
    "case_id": 0,
    "time": 0,
    "status": "",
    "member_id": 0,
    "comment": "",
    "defect": false,
    "steps": []
}

describe('Standard automated test format', () => {

    //if test case needs to be reported
    if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "false") {
        //Extend the time to wait, sometime Qase needs more time
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
        beforeEach(function () {
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



    it("Test's template for automated test execution in Qase", function () {
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        let startExecution = new Date().getTime()
        testCaseResult.case_id = 00
        testCaseResult.member_id = 1 //define automation account is required













        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given:
        var expectedResult = true

        //When:
        var actualResult = "function/validation"
        var stepOneStatus = actualResult == expectedResult
        //If there are more of one step, remember change the position value
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Email validation was successfully" : "Error, there are problems validating data: "
        })

        //Then:
        expect(stepOneStatus).toBe(true) // expect validation for each step
        var status = stepOneStatus == true ? 'passed' : 'failed'













        //TEST CASE RESULT-----------------------------------------------------------------------------
        let endExecution = new Date().getTime()
        testCaseResult.time = endExecution - startExecution
        testCaseResult.status = status
        testCaseResult.defect = status == 'passed' ? false : true
        if (status == 'passed') {
            testCaseResult.comment = "Everything is working as expected"
        } else {
            testCaseResult.comment = "Error, There are problems validating data"
        }
    })




    if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "false") {
       //Reporting to Qase
        afterEach(function (done) {
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