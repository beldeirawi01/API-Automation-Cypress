/// <reference types="cypress" />
import { postRequestBody, putRequestBody } from "../../fixtures/testData.json";


describe("CRUD Operations", () => {
    let studentID;

    it("Get All Students", () => {
        cy.request({
            method: "GET",
            url: Cypress.env("baseURL")
        }).then((response) => {
            expect (response.status).to.equal(200)

            const students = response.body.students || response.body

            expect (students).to.have.length.at.least(2)
            
            students.forEach((student) => {
                expect (student).to.have.property("STUDENT_ID")
            })
        })
    })

    it("Create New Student", () => {
        cy.request({
            method: "POST",
            url: Cypress.env("baseURL"),
            body: postRequestBody
        }).then((response) => {
            expect (response.status).to.equal(201)

            expect(response.body.STUDENT_ID).to.be.greaterThan(2)
            expect(response.body.DOB).to.be.equal(postRequestBody.DOB)
            expect(response.body.EMAIL).to.be.equal(postRequestBody.EMAIL)
            expect(response.body.FIRST_NAME).to.be.equal(postRequestBody.FIRST_NAME)
            expect(response.body.LAST_NAME).to.be.equal(postRequestBody.LAST_NAME)
            expect(response.body.INSTRUCTOR_ID).to.be.equal(postRequestBody.INSTRUCTOR_ID)

            studentID = response.body.STUDENT_ID;
        })
    })


    it("Getting Newly Created Student", () => {
        
        cy.request({
            method: "GET",
            url: `${Cypress.env("baseURL")}/${studentID}`
        }).then((response) => {
            expect (response.status).to.equal(200)

            
            expect(response.body.STUDENT_ID).to.be.equal(studentID)
            expect(response.body.DOB.substring(0, 10)).to.be.equal(postRequestBody.DOB)
            expect(response.body.EMAIL).to.be.equal(postRequestBody.EMAIL)
            expect(response.body.FIRST_NAME).to.be.equal(postRequestBody.FIRST_NAME)
            expect(response.body.LAST_NAME).to.be.equal(postRequestBody.LAST_NAME)
            expect(response.body.INSTRUCTOR_ID).to.be.equal(postRequestBody.INSTRUCTOR_ID)
        })
    })

    it("Update New Student with Different Instructor", () => {
        
        cy.request({
            method: "PUT",
            url: `${Cypress.env("baseURL")}/${studentID}`,
            body: {
                ...postRequestBody,
                STUDENT_ID: studentID,
                INSTRUCTOR_ID: putRequestBody.INSTRUCTOR_ID
            }
        }).then((response) => {
            
            expect (response.status).to.equal(200)

            expect(response.body.message).to.equal(`Successfully updated the student with the STUDENT_ID: ${ studentID }`)
        })
    })

    it("Delete New User", () => {

        cy.request({
            method: "DELETE",
            url: `${Cypress.env("baseURL")}/${studentID}`
        }).then((response) => {
            expect(response.status).to.equal(204)
        })
    })

})