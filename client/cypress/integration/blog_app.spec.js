describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'New user',
      username: 'newuser',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const secondUser = {
      name: 'Second User',
      username: 'secondUser',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  it('application displays the login form by default', function () {
    cy.contains('Login to Blog App')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('New user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'New user logged in')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'newuser', password: 'password' })
      })

      it('a blog can be created', function () {
        cy.get('#open-button').click()

        cy.get('#title').type('Cypress blog')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('https://www.cypress.io/')
        cy.get('#add-blog-button').click()

        cy.contains('Cypress blog')
      })

      describe('and blog exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Denis new blog',
            author: 'Denis',
            url: 'https://www.denis.com/',
          })
        })

        it('a user can like a blog', function () {
          cy.contains('View').click()
          cy.get('#like-count').should('contain', 0)
          cy.get('#like-button').click()
          cy.get('#like-count').should('contain', 1)
        })

        it('a user who created the blog can delete it', function () {
          cy.contains('View').click()
          cy.contains('Denis new blog')
          cy.get('#delete-button').click()
          cy.contains('Denis new blog').should('not.exist')
        })
      })
    })
  })

  describe('When another user logs in', function () {
    beforeEach(function () {
      cy.login({ username: 'secondUser', password: 'password' })
      cy.createBlog({
        title: 'Blog of second User',
        author: 'secondUser',
        url: 'http://second-user.com',
      })
    })

    it('user cant delete blog created by another user', function () {
      cy.login({ username: 'newuser', password: 'password' })
      cy.contains('Blog of second User')
      cy.contains('View').click()
      cy.get('#delete-button').should('not.exist')
    })
  })
})
