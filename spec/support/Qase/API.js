'use strict'

var request = require("request");

var headers = {
    'Content-Type': 'application/json',
    'Token': '480da117522c3a50a969e215c8133c99b19f40a3'
}

const projectCode = "GPOS"

function getAllProjects(res) {
    var limit = 100
    var offset = 0
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/project?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        res = response
        return res
    })
}


function createNewTestRun(testRunObj, res) {
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/run/' + projectCode,
        body: testRunObj,
        json: true
    }
    request.post(options, res, (err, response, body) => {
        res = response
        return res
    })
}

function getAllSuites(res) {
    var limit = 100
    var offset = 0
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/suite/' + projectCode + '?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        res = response
        return res
    })
}


function getAllTestCases(res) {
    var limit = 100
    var offset = 0
    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/case/' + projectCode + '?limit=' + limit + '&offset=' + offset,
        json: true
    }
    request.get(options, res, (err, response, body) => {
        res = response
        return res
    })
}






module.exports = {
    getAllProjects,
    createNewTestRun,
    getAllSuites,
    getAllTestCases
}
