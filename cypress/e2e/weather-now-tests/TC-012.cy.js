describe('TC-012: Search for 2 cities at the same time', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message that no city was found', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('São Paulo, Rio de Janeiro');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather');

    cy.contains('City not found').should('be.visible');
  });
});