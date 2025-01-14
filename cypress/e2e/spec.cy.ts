describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://xamunapp-x-v2test-id.azurewebsites.net/Account/Login')
    // Get an input, type into it
    cy.get('[id^=txt-username]').type('xamunjeremy@gmail.com').should('have.value', 'xamunjeremy@gmail.com')
    
    cy.get('[id^=txt-password]').type('Xamunjeremy123@').should('have.value', 'Xamunjeremy123@')
    
    // Should be on a new URL which
    // includes '/commands/actions'

    cy.get('.btn').click() // Click on button
    cy.focused().click() // Click on el with focus
    cy.contains('Sign In').click() // Click on first el containing 'Welcome'


    // cy.get('.btn').click()
    // cy.get('#formLogin').submit() 
  })
})