describe('TC-006: Search for a city that has not been founded yet', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should search for the entered city and display it if it has already been founded', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('Chris é Guloso por Brownies no matagal');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const cityName = interception.response.body.city;
      cy.log(`Captured city name: ${cityName}`);
    });
  });
});