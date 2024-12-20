describe('Edit Note Page', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'notes',
          JSON.stringify([
            {
              id: '1',
              title: 'Sample Note',
              todos: [
                { id: '1', text: 'Task 1', completed: false },
                { id: '2', text: 'Task 2', completed: true },
              ],
            },
          ])
        );
      },
    });
  
    cy.visit('/note/1');
  });
  
  

  it('should display the note title and tasks', () => {
    cy.get('input[placeholder="Enter Note Title"]').should('have.value', 'Sample Note');
    cy.get('ul > li').should('have.length', 2);
  });

  it('should allow adding a task', () => {
    cy.get('ul > li').should('have.length', 2);
    cy.contains('+ Add Task').click();
    cy.get('ul > li').should('have.length', 3);
  });

  it('should allow editing a task', () => {
    cy.get('ul > li')
      .first()
      .find('input[placeholder="Task description"]')
      .clear()
      .type('Updated Task');
    cy.get('ul > li')
      .first()
      .find('input[placeholder="Task description"]')
      .should('have.value', 'Updated Task');
  });

  it('should allow undo and redo', () => {
    cy.get('ul > li').should('have.length', 2);
    cy.contains('+ Add Task').click();
    cy.get('ul > li').should('have.length', 3);
  
    cy.get("button[title='Undo']").should('be.visible').and('not.be.disabled').click();
    cy.get('ul > li').should('have.length', 2);
  
    cy.get("button[title='Redo']").should('be.visible').and('not.be.disabled').click();
    cy.get('ul > li').should('have.length', 3);
  });
  

  it('should save changes and return to the main page', () => {
    cy.get('input[placeholder="Enter Note Title"]').should('have.value', 'Sample Note');
    cy.get('button').contains('Save').click();
    cy.wait(1000)
    cy.window().then((win) => {
      expect(win.location.pathname).to.eq('/');
    });
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
