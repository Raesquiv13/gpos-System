'use strict'
const qaseApi = require('../../../Qase/API')
const testingConfig = require('../../../config/config')
const utils = require('../../../../../utils/utils')

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

describe('Get actual date', () => {
    console.log("Get actual date")
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


    it("Split the date formatted by - and verify that all numbers comes in date", function () {
        console.log("Split the date formatted by - and verify that all numbers comes in date")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 25
        testCaseResult.member_id = 1 //define automation account is required













        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var formattedDate = ""
        var valuesSplitted = []
        var dateSystem = new Date()
        var dateAsString = dateSystem.toString()

        //When:
        formattedDate = utils.getActualDate()
        valuesSplitted = formattedDate.split("-")
        if (valuesSplitted.length == 3) {
            actualResult = dateAsString.includes(valuesSplitted[0]) &&
                dateSystem.getMonth().toString().includes(valuesSplitted[1]) &&
                dateAsString.includes(valuesSplitted[2]) ? true : false
        } else {
            console.log("Something is running wrong gettin the actual date")
            actualResult = false
        }

        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "All values splitted were included in the date system as expected" : "Error, there are problems with validation"
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
            testCaseResult.comment = "Error, There are problems with validation"
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