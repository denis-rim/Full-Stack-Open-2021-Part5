describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('application displays the login form by default', function () {
    cy.contains('Login to Blog App')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
})
