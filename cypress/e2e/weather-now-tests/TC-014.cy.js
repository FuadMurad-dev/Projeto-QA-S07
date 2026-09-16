describe("TC-014: Verify that the page loads correctly" , () => {
    beforeEach(() => {

        cy.visit("http://localhost:3000/")
    })

    it("Should display the correct title", () => {
        cy.get("h1").should("contain", "Weather Now")
        cy.get("input").should("be.visible")
        cy.get("button").should("be.visible")
        cy.get("p").should("contain", "Discover the weather in any city in the world")
    })
})






