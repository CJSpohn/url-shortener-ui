describe('visiting the home page', () => {
  it('should show the page title and existing shortened urls on load', () => {
    cy.intercept('http://localhost:3001/**', { fixture: 'apisamples.json', status: 200 })
    cy.visit('http://localhost:3000/')

    cy.get('h1')
    .contains('URL Shortener')

    cy.get('.url')
      .should('have.length', 4)

    cy.get('.url').eq(0)
      .find('h3')
      .contains('Fake Data 1')

    cy.get('.url').eq(1)
      .find('h3')
      .contains('Fake Data 2')

    cy.get('.url').eq(2)
      .find('h3')
      .contains('Fake Data 3')

    cy.get('.url').eq(3)
      .find('h3')
      .contains('Fake Data 4')
  })

  it('should contain a form with the proper inputs', () => {
    cy.get('form')
      .find('input').eq(0)
      .should('exist')

    cy.get('form')
      .find('input').eq(1)
      .should('exist')

    cy.get('button')
      .should('exist')
  })

  it('information typed should be reflected in the inputs values', () => {
    cy.get('form')
      .find('input').eq(0)
      .type('Test Me')
      .should('have.value', 'Test Me')

    cy.get('form')
      .find('input').eq(1)
      .type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .should('have.value', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
})

describe('posting a shortened url', () => {
  it('should type into the form', () => {
    cy.intercept('GET', 'http://localhost:3001/**', { fixture: 'apisamples.json', status: 200 })
    cy.visit('http://localhost:3000/')

    cy.get('form')
      .find('input').eq(0)
      .type('Testing Post')

    cy.get('form')
      .find('input').eq(1)
      .type('https://superfakeurl.com/please-shorten-this-in-the-test')
  })

  it('should click the post button', () => {
    cy.intercept('POST', 'http://localhost:3001/**', {
      status: 200,
      body: {
        id: 5,
        long_url: 'https://superfakeurl.com/please-shorten-this-in-the-test',
        short_url: 'http://localhost:3001/useshorturl/5',
        title: 'Testing Post'
      }
    })
    cy.intercept('GET', 'http://localhost:3001/**', {fixture: 'apiSamplePost.json', statusCode: 200})
    cy.get('button').click();
  })

  it('should find the newly added piece of mock data on the DOM', () => {
    cy.get('.url').eq(4)
      .find('h3')
      .contains('Fake Data 5')

    cy.get('.url').eq(4)
      .find('a')
      .contains('http://localhost:3001/useshorturl/5')
  })
})

describe('sad path testing', () => {
  it('should let the user know if the GET fails', () => {
    cy.intercept('GET', 'http://localhost:3001/**', {statusCode: 400})
    cy.visit('http://localhost:3000/')

    cy.get('.error-message')
      .should('exist')
      .contains('Sorry something went wrong')
  })

  //The server doesn't actually verify anything. An incomplete form is still sending back
  //a successful request, and renders a card with nothing on it but I figured I could fake
  //it here for the purpose of demonstrating I know how.
  it('should not update a new card if the user submits an incomplete form', () => {
    cy.intercept('GET', 'http://localhost:3001/**', {fixture: 'apiSamplePost.json', status: 200})
    cy.intercept('POST', 'http://localhost:3001/**', {
      status: 400,
      body: {
        msg: "Failed to post, you are missing a URL or Title"
      }
    })

    cy.get('button').click()
    cy.get('.url')
      .should('have.length', 5)
  })

})
