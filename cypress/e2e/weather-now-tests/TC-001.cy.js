describe('TC-001: Busca por cidade com as primeiras letras maiusculas e as demais minusculas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve buscar a cidade inserida e exibir os dados do clima', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('Nova York');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('Current condition')
    cy.contains('°C').should('be.visible');
    cy.contains('Humidity').should('be.visible');
    cy.contains('Wind').should('be.visible');
  });
});