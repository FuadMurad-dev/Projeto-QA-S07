describe('TC-011: Search with an extremely long string (Boundary Value Analysis)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should handle extremely long input strings gracefully without crashing', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    const longCityName = 'A'.repeat(300);

    cy.get('input[type="text"]').clear().type(longCityName);
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(404);
    });

    cy.contains('City not found').should('be.visible');
  });
});