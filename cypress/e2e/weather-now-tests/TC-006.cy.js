describe('TC-006: Search for a city that has not been founded yet', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message when the city is entered', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('Chris é Guloso por Brownies no matagal');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(404);
    });

    cy.contains('City not found').should('be.visible');
  });
});