describe('Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('/') // Adjust the URL to your application's URL
    })

    it('validate index info', () => {
        cy.contains('TechSolutions')
        cy.contains('Transformamos Ideas')
    })
})