

describe("Tests" , () => {
    beforeEach(() => {

        cy.visit("http://localhost:3000/")
    })

    it("Verify that the page loads correctly", () => {
        cy.get("h1").should("contain", "Weather Now")
        cy.get("input").should("be.visible")
        cy.get("button").should("be.visible")
    })
})