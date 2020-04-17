'use strict'
const qaseApi = require('../support/Qase/API')
const utils = require('../../utils/utils')
const testingConfig = require('../../spec/support/config/config')
const qaseProject = require('../support/Qase/project')

if (testingConfig.CREATE_AUTOMATED_TEST_RUN == "false") {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    describe('Automated test run creation', function () {
        console.log("Automated test run creation")
        var testRunObj = []
        beforeEach(function () {
            testRunObj = {
                "title": "",
                "description": "",
                "environment_id": null,
                "cases": []
            }
        })

        it('Unit Testing', function (done) {
            console.log("Unit Testing")
            const UNIT_TESTING_ID = 13
            //============================Suites============================================================
            qaseApi.getAllSuites(function (err, response) {
                var suites_ids = []
                suites_ids = qaseProject.getSuitesIdsUnderParentSuite(UNIT_TESTING_ID, response)
                //============================Test cases=====================================================
                qaseApi.getAllTestCases(function (err, response) {
                    var testCases_ids = []
                    testCases_ids = qaseProject.getTestCasesIdsUnderParentSuitesIds(suites_ids, response)
                    //============================Test run creation=========================================
                    var actualDate = utils.getActualDate()
                    testRunObj.title = "Automated Unit Testing " + actualDate
                    testRunObj.description = "all test cases automated under unit testing suite"
                    testRunObj.environment_id = null
                    testRunObj.cases = testCases_ids
                    done()
                })
            })
        })

        /* it('Regression Testing', (done) => {
             const REGRESSION_TESTING_ID = 4
             //============================Suites============================================================
             qaseApi.getAllSuites(function (err, response) {
                 var suites_ids = []
                 suites_ids = qaseProject.getSuitesIdsUnderParentSuite(REGRESSION_TESTING_ID, response)
                 //============================Test cases=====================================================
                 qaseApi.getAllTestCases(function (err, response) {
                     var testCases_ids = []
                     testCases_ids = qaseProject.getTestCasesIdsUnderParentSuitesIds(suites_ids, response)
                     //============================Test run creation=========================================
                     var actualDate = utils.getActualDate()
                     var testRunObj = {
                         "title": "Automated Regression Testing " + actualDate,
                         "description": "all test cases automated under Regression testing suite",
                         "environment_id": null,
                         "cases": testCases_ids
                     }
                     qaseApi.createNewTestRun(testRunObj, function (err, response) {
                         expect(response.statusCode).toBe(200)
                         done()
                     })
                 })
             })
         })*/

        afterEach(function (done) {
            qaseApi.createNewTestRun(testRunObj, function (err, response) {
                if (err) {
                    console.log("Error, creating automatic test tun to Qase.")
                    console.log(err)
                } else if (response.statusCode == 200) {
                    if (response.body.status == false) {
                        console.log("Error, Qase API response status 200 but there is an error included in the response body.")
                        console.log(response.body)
                    } else {
                        console.log("Automatic test run was created to Qase successfully.")
                        testingConfig.UNIT_TESTING_TEST_RUN_ID = response.body.result.id
                    }
                } else {
                    console.log("Error, there is an unknow issues while system is creating automatic test run to Qase.")
                    console.log("Status code: " + response.statusCode)
                    console.log("message:")
                    console.log(response.body.message)
                }
                done()
            })
        })

    })
}