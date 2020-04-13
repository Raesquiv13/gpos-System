'use strict'

const Qase = require('../../Qase/API')

describe('Testing API of Qase', () => {

    it('Get all projects', (done) => {
        Qase.getAllProjects(function (err, response) {
            var projectTitle = response.body.result.entities[0].title
            expect(projectTitle).toBe("gpos-system-backend")
            expect(response.statusCode).toBe(200)
            done()
        })
    })



})

