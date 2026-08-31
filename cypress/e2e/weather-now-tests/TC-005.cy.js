describe('TC-005: Comparação de busca em Português e Inglês', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve garantir que as buscas por "Nova York" e "New York" retornam a mesma cidade', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');

    let primeironome;

    cy.get('input[type="text"]').clear().type('Nova York');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      primeironome = interception.response.body.city;
      cy.log(`Primeiro nome capturado: ${primeironome}`);
    });

    cy.get('input[type="text"]').clear().type('New York');
    cy.contains('button', 'Search').click();

    cy.wait('@getWeather').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const segundoNome = interception.response.body.city;
      cy.log(`Segundo nome capturado: ${segundoNome}`);

      expect(primeironome).to.eq(segundoNome);
    });

    cy.contains('New York').should('be.visible');
  });
});