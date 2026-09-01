describe('TC-005: Search comparison in Portuguese and English', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should ensure that searches for "Nova York" and "New York" return the same city', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    let firstName;
    let secondName;

    cy.get('input[type="text"]').clear().type('Nova York');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      firstName = interception.response.body.city;
      cy.log(`First captured name: ${firstName}`);
    });

    cy.get('input[type="text"]').clear().type('New York');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      secondName = interception.response.body.city;
      cy.log(`Second captured name: ${secondName}`);

      expect(firstName).to.eq(secondName);
    });

    cy.contains('New York').should('be.visible');
  });
});