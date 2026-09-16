describe('TC-019: Search triggered by pressing the Enter key', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display city when the Enter key is pressed', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');
    cy.get('input[type="text"]').clear().type('Tokyo{enter}');

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains('Tokyo').should('be.visible');
    cy.contains('Current condition').should('be.visible');
  });
});