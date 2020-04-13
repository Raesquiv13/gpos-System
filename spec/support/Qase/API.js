'use strict'

const request = require("request");
const testingConfig = require('../../../spec/support/config/config')

//API General configurations
const projectCode = testingConfig.QASE_PROJECT_CODE
var limit = 100
var offset = 0
var headers = {
    'Content-Type': 'application/json',
    'Token': '480da117522c3a50a969e215c8133c99b19f40a3'
}

/**
 *** This function is used to: 
  * Get the list of projects in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var response : {The list of projects}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
**/
function getAllProjects(res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/project?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        if (err) {
            console.log(`Error al realizar la peticion: ${err}`)
            res = err
        } else { res = response }
        return res
    })
}

/**
 *** This function is used to: 
  * Create a new test run in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param testRunObj It is the body data necessary to create a test run,
  * information like title and the test cases ids comes in the object.
  * 
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var response : {"status": true}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
**/
function createNewTestRun(testRunObj, res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/run/' + projectCode,
        body: testRunObj,
        json: true
    }
    request.post(options, res, (err, response, body) => {
        if (err) {
            console.log(`Error al realizar la peticion: ${err}`)
            res = err
        } else { res = response }
        return res
    })
}

/**
 *** This function is used to: 
  * Get all suites under GPOS project in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var response : {The list of test suites under GPOS project}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
**/
function getAllSuites(res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/suite/' + projectCode + '?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        if (err) {
            console.log(`Error al realizar la peticion: ${err}`)
            res = err
        } else { res = response }
        return res
    })
}

/**
 *** This function is used to: 
  * Get all test cases under GPOS project in Qase.
  *  
  * 
 *** Information about parameters.
 ** @param res It is what the API response.
  * The function will response:
  * 
  * If everything is fine.
  * status : 200 
  * @var response : {The list of test cases under GPOS project}
  * 
  * If something is wrong:
  * status : 500
  * Error al realizar la peticion: @var err
  * 
**/
function getAllTestCases(res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/case/' + projectCode + '?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        if (err) {
            console.log(`Error al realizar la peticion: ${err}`)
            res = err
        } else { res = response }
        return res
    })
}

function addNewTestRunResult(runId, testCaseResult, res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/result/' + projectCode + '/' + runId ,
        body: testCaseResult,
        json: true
    }
    request.post(options, res, (err, response, body) => {
        if (err) {
            console.log(`Error al realizar la peticion: ${err}`)
            res = err
        } else { res = response }
        return res
    })
}

module.exports = {
    getAllProjects,
    createNewTestRun,
    getAllSuites,
    getAllTestCases,
    addNewTestRunResult
}
