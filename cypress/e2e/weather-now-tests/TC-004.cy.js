describe('TC-004: Busca pela mesma cidade de TC-001 porém agora sem acentos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve buscar a cidade inserida e exibir a mesma exatamente igual a TC-001', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    cy.get('input[type="text"]').clear().type('sao paulo');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('São Paulo').should('be.visible');
  });
});