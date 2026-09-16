describe('TC-017: Search for a city and a country', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display that the city was found', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('São Paulo, BR');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains('São Paulo, BR').should('be.visible');
    cy.contains('Current condition').should('be.visible');
  });
});