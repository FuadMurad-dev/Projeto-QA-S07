describe('TC-007: Pressing the button without entering a city', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display an error message when no city is entered', () => {

    cy.contains('button', 'Search').click();

    cy.contains('Please enter a city name').should('be.visible');
  });
});