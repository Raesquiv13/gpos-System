'use strict'

var request = require("request");

function getAllProjects(res) {
    var headers = {
        'Content-Type': 'application/json',
        'Token': '480da117522c3a50a969e215c8133c99b19f40a3'
    }
    var projectBody = '{ "limit": 100, "offset": 0 }'

    var options = {
        headers: headers,
        url: 'https://api.qase.io/v1/project',
        body: projectBody,
        json: true
    }

    request.get(options, res, (err, response, bb) => {
        res = response
        return res
    })
}










module.exports = {
    getAllProjects
}
