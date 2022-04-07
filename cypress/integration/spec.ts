describe('Users Page', () => {
  it('Visits the initial project page', () => {
    cy.visit('')
    cy.contains('Filter By Gender')
    cy.contains('Filter By Nationality')
    cy.contains('Toggle Columns')
  })

  it('Table has at least one tr tag', () => {
    cy.get('p-table').find('tr').should('have.length.above', 0)
  })
})
