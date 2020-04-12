'use strict'
const Qase = require('../support/Qase/API')
const utils = require('../../utils/utils')
const config = require('../../config')
var suites_ids
var testCases_ids

if (config.CREATE_AUTOMATED_SUITE) {
    describe('Automated test run creation', () => {
        it('All test cases under Unit Testing', (done) => {
            //============================Suites============================================================
            Qase.getAllSuites(function (err, response) {
                var suitesList = response.body.result.entities
                var suiteIdList = []
                var globalSuiteIdList = []
                var totalGlobalSuiteId = 0
                //add the unit testing suite ID
                globalSuiteIdList.push(13)
                suiteIdList.push(13)
                // use suiteIdList as an auxiliar list
                var continueLoop = true
                while (continueLoop) {
                    totalGlobalSuiteId = globalSuiteIdList.length
                    for (const index in suiteIdList) {
                        var suiteId = suiteIdList[index]
                        for (const index in suitesList) {
                            var suite = suitesList[index]
                            if (suite.parent_id === suiteId && !globalSuiteIdList.includes(suite.id)) {
                                suiteIdList.push(suite.id)
                                globalSuiteIdList.push(suite.id)
                                suitesList = utils.removeItemFromArr(suitesList, suite)
                            }
                        }
                        suiteIdList.shift()
                        if (globalSuiteIdList.length === totalGlobalSuiteId) continueLoop = false
                    }
                }
                suites_ids = globalSuiteIdList
                //============================Test cases=====================================================
                Qase.getAllTestCases(function (err, response) {
                    var testCasesList = response.body.result.entities
                    var globalTestCasesIdList = []
                    for (const index in suites_ids) {
                        var suiteId = suites_ids[index]
                        for (const index in testCasesList) {
                            var testCase = testCasesList[index]
                            if (testCase.suite_id === suiteId) {
                                globalTestCasesIdList.push(testCase.id)
                                testCasesList = utils.removeItemFromArr(testCasesList, testCase)
                            }
                        }
                    }
                    testCases_ids = globalTestCasesIdList
                    //============================Test run creation=========================================
                    //a este punto tengo la lista de todos los id de los test case que envuelven el unite test
                    var actualDate = utils.getActualDate()
                    var testRunObj = {
                        "title": "Automated Unit Testing " + actualDate,
                        "description": "all test cases under unit testing suite",
                        "environment_id": null,
                        "cases": testCases_ids
                    }
                    Qase.createNewTestRun(testRunObj, function (err, response) {
                        expect(response.statusCode).toBe(200)
                        done()
                    })
                })
            })
        })
    })
}



/*describe('GPOS suites under Unit testing', () => {
    it('Getting all IDs of the suites under Unit Testing', (done) => {
        //============================Suites==============================================
        Qase.getAllSuites(function (err, response) {
            var suitesList = response.body.result.entities
            var suiteIdList = []
            var globalSuiteIdList = []
            var totalGlobalSuiteId = 0
            //add the unit testing suite ID
            globalSuiteIdList.push(13)
            suiteIdList.push(13)
            // use suiteIdList as an auxiliar list
            var continueLoop = true
            while (continueLoop) {
                totalGlobalSuiteId = globalSuiteIdList.length
                for (const index in suiteIdList) {
                    var suiteId = suiteIdList[index]
                    for (const index in suitesList) {
                        var suite = suitesList[index]
                        if (suite.parent_id === suiteId && !globalSuiteIdList.includes(suite.id)) {
                            suiteIdList.push(suite.id)
                            globalSuiteIdList.push(suite.id)
                            suitesList = utils.removeItemFromArr(suitesList, suite)
                        }
                    }
                    suiteIdList.shift()
                    if (globalSuiteIdList.length === totalGlobalSuiteId) continueLoop = false
                }
            }
            suites_ids = globalSuiteIdList
           done()
        })

    })
})*/

/*describe('GPOS test cases', () => {

    it('Getting the list of test cases under GPOS project', (done) => {

        Qase.getAllTestCases(function (err, response) {
            var testCasesList = response.body.result.entities
            var globalTestCasesIdList = []
            for (const index in suites_ids) {
                var suiteId = suites_ids[index]
                for (const index in testCasesList) {
                    var testCase = testCasesList[index]
                    if (testCase.suite_id === suiteId) {
                        globalTestCasesIdList.push(testCase.id)
                        testCasesList = utils.removeItemFromArr(testCasesList, testCase)
                    }
                }
            }
            testCases_ids = globalTestCasesIdList
            done()
        })
        //obtener todos los test cases
        // ya con todos los casos de prueba se crea logica para guardar el id de los que tengan
        // suite_id igual que las que hemos guardado

    })




})*/

/*describe('bbbbbbb', () => {

    it('aaaaaaa', (done) => {

        //ahora busco las suites por id y obtengo todos los test cases id que tengan

        //a este punto tengo la lista de todos los id de los test case que envuelven el unite test
        var listTestCasesId = [1, 2]

        /*
         var testRunObj = {
             "title": "New automated demo",
             "description": "all test cases under unit testing suite",
             "environment_id": null,
             "cases":listTestCasesId
         }
         Qase.createNewTestRun(testRunObj, function (err, response) {
             expect(response.statusCode).toBe(200)
             done()
         })
        done()
    })
})*/