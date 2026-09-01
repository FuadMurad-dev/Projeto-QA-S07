describe('TC-001: Search for a city following proper grammar rules', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should search for the entered city and display it', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('São Paulo');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains('São Paulo').should('be.visible');
  });
});