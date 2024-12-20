describe('Notes Page', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'notes',
          JSON.stringify([
            { id: '1', title: 'Note 1', todos: [] },
            { id: '2', title: 'Note 2', todos: [{ id: '1', text: 'Task 1', completed: false }] },
          ])
        );
      },
    });
  });

  it('should display the page title', () => {
    cy.contains('h1', 'Notes').should('be.visible');
  });

  it('should display existing notes', () => {
    cy.get('ul > li.bg-white.rounded-lg.shadow-md.transition.transform').should('have.length', 2); // Убедиться, что есть две заметки
  });

  it('should allow creating a new note', () => {
    cy.get('ul > li.bg-white.rounded-lg.shadow-md.transition.transform').should('have.length', 2);
    cy.get("button[title='+ Create New Note']").click();
  
    cy.wait(500)
    cy.window().then((win) => {
      expect(win.location.pathname).to.include('/');
    });
    cy.wait(500)
    cy.url().should('include', Cypress.config().baseUrl + '/');
    cy.get('input[placeholder="Enter Note Title"]').should('exist');
  });
  

  it('should allow editing a note', () => {
    cy.contains('Edit').first().click();
    cy.url().should('include', '/note/1');
  });

  it('should open a confirmation dialog when deleting a note', () => {
    cy.contains('Delete').first().click();
    cy.contains('Are you sure?').should('be.visible');
    cy.wait(500)
    cy.get("button[title='No']").click();
    cy.contains('Are you sure?').should('not.exist');
  });
});
