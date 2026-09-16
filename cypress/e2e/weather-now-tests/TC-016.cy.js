describe('TC-016: Simulate extreme API delay (Timeout & Loading state)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should handle slow responses and show a loading state during delay', () => {
    cy.intercept('GET', '**/api/weather*', {
      delay: 5000,
      statusCode: 200,
      body: {
        city: 'London',
        temp: 15,
        condition: 'cloudy',
      }
    }).as('getWeatherDelayed');

    cy.get('input[type="text"]').clear().type('London');
    cy.contains('button', 'Search').click();
    
    cy.get('button')
      .should('be.disabled')
      .and('contain', 'Searching...');

    cy.wait('@getWeatherDelayed', { timeout: 7000 });
    cy.contains('Current condition').should('be.visible');
  });
});