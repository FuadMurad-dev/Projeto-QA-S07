describe('TC-010: Search with only numbers', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message that no city was found', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('1234567890');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(404);
    });

    cy.contains('City not found').should('be.visible');
  });
});