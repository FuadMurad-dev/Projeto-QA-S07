describe('TC-001: Busca por cidade seguindo as normas de gramática', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve buscar a cidade inserida e exibir a mesma', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('São Paulo');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('São Paulo').should('be.visible');
  });
});