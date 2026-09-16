describe('TC-020: Simulate API Rate Limit Exceeded', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display a warning message when the API rate limit is exceeded', () => {
    cy.intercept('GET', '**/weather*', {
      statusCode: 429,
      body: { error: 'Too Many Requests or Rate Limit Exceeded' },
    }).as('getWeather429');

    cy.get('input[type="text"]').clear().type('Madrid');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather429');

    cy.contains('Too Many Requests or Rate Limit Exceeded').should('be.visible');
    cy.contains('try again').should('be.visible');
  });
});