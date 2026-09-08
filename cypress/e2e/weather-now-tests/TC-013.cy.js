describe('TC-013: Search for the right city but wrong country', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message that no city was found', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('São Paulo, FR');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather');

    cy.contains('City not found').should('be.visible');
  });
});