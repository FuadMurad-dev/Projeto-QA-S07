describe('TC-004: Search for the same city as TC-001 but without accents', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should search for the entered city and display it exactly the same as TC-001', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('sao paulo');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains('São Paulo').should('be.visible');
  });
});