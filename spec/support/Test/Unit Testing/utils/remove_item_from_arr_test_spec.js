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


describe('Remove items from array or list', () => {
    console.log("Remove items from array or list")
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


    it("removing the unique element in the array", function () {
        console.log("removing the unique element in the array")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 22
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var arr = [1]


        //When:
        //validate that arr has only one element
        expect(arr.length).toBe(1)
        arr = utils.removeItemFromArr(arr, 1)
        //validate that arr has zero elements
        expect(arr.length).toBe(0)
        actualResult = arr.length == 0
        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "The unique element in the array was deleted successfully" : "Error, there are problems removing an unique element in the array"
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
            testCaseResult.comment = "Error, There are problems removing element from array"
        }
    })


    it("Using array of Strings", function () {
        console.log("Using array of Strings")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 23
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var arr = [
            "verde",
            "azul",
            "amarillo"
        ]


        //When:
        arr = utils.removeItemFromArr(arr, "azul")
        actualResult = arr.includes("azul") ? false : true
        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Element was removed in array of strings successfully" : "Error, there are problems removing an element in array of strings"
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
            testCaseResult.comment = "Error, There are problems removing element from array"
        }
    })


    it("Using array of objects", function () {
        console.log("Using array of objects")
        //TEST CASE RESULT PRE SET-UP----------------------------------------------------------------
        testCaseResult.case_id = 24
        testCaseResult.member_id = 1 //define automation account is required


        //TEST CASE FLOW------------------------------------------------------------------------------
        //Given
        var expectedResult = true
        var actualResult
        var stepOneStatus
        var status
        var arr = [{
                "nombre": "carlos",
                "edad": "19"
            },
            {
                "nombre": "marcos",
                "edad": "20"
            }
        ]


        //When:
        arr = utils.removeItemFromArr(arr, arr[0])
        actualResult = arr[0].nombre.includes("carlos") ? false : true
        stepOneStatus = actualResult == expectedResult
        testCaseResult.steps.push({
            "position": 1,
            "status": stepOneStatus == true ? "passed" : "failed",
            "comment": stepOneStatus == true ?
                "Object was deleted successfully from array" : "Error, there are problems removing an object in the array"
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
            testCaseResult.comment = "Error, There are problems removing an object from array"
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