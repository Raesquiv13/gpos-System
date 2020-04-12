'use strict'
const qaseApi = require('../support/Qase/API')
const utils = require('../../utils/utils')
const testingConfig = require('../../spec/support/config/config')
const qaseProject = require('../support/Qase/project')
if (testingConfig.CREATE_AUTOMATED_TEST_RUN) {
    describe('Automated test run creation', () => {
        it('Unit Testing', (done) => {
            const UNIT_TESTING_ID = 13
            //============================Suites============================================================
            qaseApi.getAllSuites(function (err, response) {
                var suites_ids = []
                suites_ids = qaseProject.getSuitesIdsUndesPaternSuite(UNIT_TESTING_ID, response)
                //============================Test cases=====================================================
                qaseApi.getAllTestCases(function (err, response) {
                    var testCases_ids = []
                    testCases_ids = qaseProject.getTestCasesIdsUnderPaternSuiteId(suites_ids, response)
                    //============================Test run creation=========================================
                    var actualDate = utils.getActualDate()
                    var testRunObj = {
                        "title": "Automated Unit Testing " + actualDate,
                        "description": "all test cases automated under unit testing suite",
                        "environment_id": null,
                        "cases": testCases_ids
                    }
                    qaseApi.createNewTestRun(testRunObj, function (err, response) {
                        expect(response.statusCode).toBe(200)
                        done()
                    })
                })
            })
        })

        it('Regression Testing', (done) => {
            const REGRESSION_TESTING_ID = 4
            //============================Suites============================================================
            qaseApi.getAllSuites(function (err, response) {
                var suites_ids = []
                suites_ids = qaseProject.getSuitesIdsUndesPaternSuite(REGRESSION_TESTING_ID, response)
                //============================Test cases=====================================================
                qaseApi.getAllTestCases(function (err, response) {
                    var testCases_ids = []
                    testCases_ids = qaseProject.getTestCasesIdsUnderPaternSuiteId(suites_ids, response)
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
        })
    })
}