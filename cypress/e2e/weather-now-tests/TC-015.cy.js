describe('TC-015: Simulate 500 Internal Server Error from API', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display a user-friendly error message when the server returns 500', () => {
    cy.intercept('GET', '**/weather*', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('getWeather500');

    cy.get('input[type="text"]').clear().type('São Paulo');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather500');
    cy.contains('Internal Server Error').should('be.visible');
    cy.contains('try again').should('be.visible');

  });
});