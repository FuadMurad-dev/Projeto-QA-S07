describe('TC-006: Busca por cidade ainda não fundada', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve buscar a cidade inserida e exibir a mesma, caso ela já tenha sido fundada', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('Chris é Guloso por Brownies no matagal');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      nomecidade = interception.response.body.city;
      cy.log(`Nome da cidade capturado: ${nomecidade}`);
    });
    cy.contains().should('be.visible');
  });
});