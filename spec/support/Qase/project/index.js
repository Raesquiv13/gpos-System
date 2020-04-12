'use strict'

const utils = require('../../../../utils/utils')

function getSuitesIdsUndesPaternSuite(paternSuiteId, suitesResponse) {
    var globalSuiteIdList = []
    var suitesList = suitesResponse.body.result.entities
    var suiteIdList = []
    var totalGlobalSuiteId = 0
    globalSuiteIdList.push(paternSuiteId)
    suiteIdList.push(paternSuiteId)
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
    return globalSuiteIdList
}

function getTestCasesIdsUnderPaternSuiteId(suites_ids,testCasesResponse){
    var testCasesList = testCasesResponse.body.result.entities
    var globalTestCasesIdList = []
    for (const index in suites_ids) {
        var suiteId = suites_ids[index]
        for (const index in testCasesList) {
            var testCase = testCasesList[index]
            if (testCase.suite_id === suiteId && testCase.automation === 2) {
                globalTestCasesIdList.push(testCase.id)
            }
        }
    }
    return globalTestCasesIdList
}

module.exports = {
    getSuitesIdsUndesPaternSuite,
    getTestCasesIdsUnderPaternSuiteId
}