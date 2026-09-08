describe('TC-008: Search for a city that has space on the name but withouit using the space.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message when the city is entered (the site search the citys without the spaces handle spaces)', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('RioDeJaneiro');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(404);
    });

    cy.contains('City not found').should('be.visible');
  });
});