describe('Formulario de Contacto', () => {
    beforeEach(() => {
        cy.visit('/contact.html')
    })

    it('debe mostrar todos los campos del formulario', () => {
        cy.get('#name').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#phone').should('be.visible')
        cy.get('#subject').should('be.visible')
        cy.get('#message').should('be.visible')
        cy.get('#terms').should('be.visible')
    })

    it('debe completar y enviar el formulario correctamente', () => {
        // Completar campos
        cy.get('#name').type('Juan Pérez')
        cy.get('#email').type('juan.perez@example.com')
        cy.get('#phone').type('+54 11 1234-5678')
        cy.get('#subject').select('consulta')
        cy.get('#message').type('Este es un mensaje de prueba para el formulario de contacto')
        cy.get('#terms').check()

        // Enviar formulario
        cy.get('button[type="submit"]').click()

        // Verificar redirección a feedback
        cy.url().should('include', 'feedback.html')
        cy.contains('¡Formulario Enviado Exitosamente!')
    })

    it('debe limpiar el formulario al hacer click en Limpiar', () => {
        cy.get('#name').type('Test')
        cy.get('#email').type('test@test.com')
        cy.get('button[type="reset"]').click()

        cy.get('#name').should('have.value', '')
        cy.get('#email').should('have.value', '')
    })
})