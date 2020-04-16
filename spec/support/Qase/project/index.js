'use strict'

const utils = require('../../../../utils/utils')

/**
 *** This function is used to: 
  * Get all ids of the suites under a parent suite in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param parentSuiteId It is the ID of the parent suite.
  * 
 ** @param suitesResponse It is the list of suites under GPOS project.
  * 
  * 
  * The function will return:
  * The list of suites IDs @var globalSuiteIdList
  *
**/
function getSuitesIdsUnderParentSuite(parentSuiteId, suitesResponse) {
    var globalSuiteIdList = []
    var suitesList = suitesResponse.body.result.entities
    var suiteIdList = []
    var totalGlobalSuiteId = 0
    globalSuiteIdList.push(parentSuiteId)
    suiteIdList.push(parentSuiteId)
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

/**
 *** This function is used to: 
  * Get all ids of the test cases under GPOS project in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param suites_ids It is the IDs of the suites using the hierarchy of the parent suited in Qase.
  * 
 ** @param testCasesResponse It is the list of test cases under GPOS project.
  * 
  * 
  * The function will return:
  * The list of test cases IDs @var globalTestCasesIdList
  *
**/
function getTestCasesIdsUnderParentSuitesIds(suites_ids, testCasesResponse) {
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
    getSuitesIdsUnderParentSuite,
    getTestCasesIdsUnderParentSuitesIds
}