describe('TC-018: Search comparison for cities with the same name in different countries', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should ensure that searching for "La Paz, BO" and "La Paz, MX" returns different time values', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    let firstTime;
    let secondTime;

    cy.get('input[type="text"]').clear().type('La Paz, BO');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      firstTime = interception.response.body.time;
      cy.log(`First captured time (La Paz, BO): ${firstTime}`);
    });

    cy.get('input[type="text"]').clear().type('La Paz, MX');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      secondTime = interception.response.body.time;
      cy.log(`Second captured time (La Paz, MX): ${secondTime}`);

      expect(firstTime).to.not.eq(secondTime);
    });
  });
});