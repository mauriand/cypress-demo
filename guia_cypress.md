# Guía Detallada: Agregar Cypress a la Aplicación TechSolutions

## Índice
1. [Prerrequisitos](#prerrequisitos)
2. [Instalación de Cypress](#instalación-de-cypress)
3. [Configuración Inicial](#configuración-inicial)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Configuración de Cypress](#configuración-de-cypress)
6. [Scripts NPM](#scripts-npm)
7. [Creación de Tests](#creación-de-tests)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Ejecución de Tests](#ejecución-de-tests)

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener:

- **Node.js** instalado (versión 14 o superior recomendada)
- **npm** o **yarn** como gestor de paquetes
- La aplicación funcionando correctamente en `http://localhost:3000`
- Conocimientos básicos de JavaScript y testing

---

## Instalación de Cypress

### Paso 1: Instalar Cypress como dependencia de desarrollo

```bash
npm install --save-dev cypress
```

O si usas yarn:

```bash
yarn add -D cypress
```

**Nota:** Cypress se instala como dependencia de desarrollo porque solo se necesita durante el desarrollo y no en producción.

### Paso 2: Verificar la instalación

Después de la instalación, deberías ver:
- Cypress agregado en `package.json` bajo `devDependencies`
- La carpeta `node_modules/cypress` creada

---

## Configuración Inicial

### Paso 3: Abrir Cypress por primera vez

Ejecuta el siguiente comando para inicializar Cypress:

```bash
npx cypress open
```

**¿Qué sucede?**
- Cypress crea automáticamente la estructura de carpetas necesaria
- Se genera el archivo `cypress.config.js` en la raíz del proyecto
- Se crean las carpetas: `cypress/fixtures`, `cypress/support`

**Estructura creada:**
```
app-demo/
├── cypress/
│   ├── e2e/              # Tests end-to-end
│   ├── fixtures/         # Datos de prueba (JSON, etc.)
│   └── support/          # Comandos personalizados y configuración
│       ├── commands.js   # Comandos personalizados
│       └── e2e.js        # Configuración global para tests
├── cypress.config.js     # Archivo de configuración principal
└── ...
```

---

## Estructura de Carpetas

### Organización recomendada:

```
app-demo/
├── cypress/
│   ├── e2e/
│   │   ├── navigation.cy.js      # Tests de navegación
│   │   ├── contact-form.cy.js    # Tests del formulario
│   │   ├── form-validation.cy.js # Tests de validaciones
│   │   └── feedback.cy.js        # Tests de la página de feedback
│   ├── fixtures/
│   │   └── test-data.json        # Datos de prueba reutilizables
│   └── support/
│       ├── commands.js           # Comandos personalizados
│       └── e2e.js                # Configuración global
├── cypress.config.js
└── ...
```

---

## Configuración de Cypress

### Paso 4: Configurar `cypress.config.js`

Edita el archivo `cypress.config.js` generado con la siguiente configuración:

```javascript
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 2000,
    requestTimeout: 2000,
    responseTimeout: 2000,
    setupNodeEvents(on, config) {
      // Implementar plugins aquí si es necesario
    },
  },
})
```

**Explicación de opciones:**

- **`baseUrl`**: URL base de la aplicación (debe coincidir con el puerto del servidor)
- **`viewportWidth/Height`**: Tamaño de la ventana del navegador durante los tests
- **`video`**: Grabar videos de las ejecuciones de tests (útil para debugging)
- **`screenshotOnRunFailure`**: Tomar screenshots automáticamente cuando un test falla
- **`defaultCommandTimeout`**: Tiempo máximo de espera para comandos (10 segundos)
- **`requestTimeout`**: Tiempo máximo para requests HTTP
- **`responseTimeout`**: Tiempo máximo para respuestas HTTP

### Paso 5: Configurar `cypress/support/e2e.js`

Este archivo se ejecuta antes de cada test. Úsalo para configuraciones globales:

```javascript
// Importar comandos personalizados
import './commands'

// Configuraciones globales
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Útil si la aplicación tiene errores no críticos
  return false
})
```

---

## Scripts NPM

### Paso 6: Agregar scripts al `package.json`

Agrega los siguientes scripts a tu `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:headed": "cypress run --headed",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open"
  }
}
```

**Explicación de scripts:**

- **`cypress:open`**: Abre la interfaz gráfica de Cypress (Test Runner)
- **`cypress:run`**: Ejecuta tests en modo headless (sin interfaz gráfica)
- **`cypress:run:headed`**: Ejecuta tests con navegador visible
- **`test:e2e`**: Alias para ejecución de tests (convención común)
- **`test:e2e:open`**: Alias para abrir Cypress

---

## Creación de Tests

### Paso 7: Crear el primer test de navegación

Crea el archivo `cypress/e2e/navigation.cy.js`:

```javascript
describe('Navegación de la aplicación', () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada test
    cy.visit('/')
  })

  it('debe cargar la página principal correctamente', () => {
    cy.contains('TechSolutions')
    cy.contains('Transformamos Ideas en Soluciones Tecnológicas')
  })

  it('debe navegar al formulario de contacto desde el menú', () => {
    cy.contains('Contacto').click()
    cy.url().should('include', 'contact.html')
    cy.contains('Formulario de Contacto')
  })

  it('debe navegar al formulario desde el botón principal', () => {
    cy.contains('Contáctanos').click()
    cy.url().should('include', 'contact.html')
  })

  it('debe volver a la página principal desde el menú', () => {
    cy.visit('/contact.html')
    cy.get('a[href="index.html"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/index.html')
  })
})
```

### Paso 8: Crear test del formulario de contacto

Crea el archivo `cypress/e2e/contact-form.cy.js`:

```javascript
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
```

### Paso 9: Crear test de validaciones

Crea el archivo `cypress/e2e/form-validation.cy.js`:

```javascript
describe('Validaciones del Formulario', () => {
  beforeEach(() => {
    cy.visit('/contact.html')
  })

  it('debe mostrar error si el nombre está vacío', () => {
    cy.get('#name').focus().blur()
    cy.get('#nameError').should('contain', 'El nombre es requerido')
  })

  it('debe mostrar error si el nombre tiene menos de 3 caracteres', () => {
    cy.get('#name').type('Ab').blur()
    cy.get('#nameError').should('contain', 'al menos 3 caracteres')
  })

  it('debe mostrar error si el email está vacío', () => {
    cy.get('#email').focus().blur()
    cy.get('#emailError').should('contain', 'El email es requerido')
  })

  it('debe mostrar error si el email no tiene formato válido', () => {
    cy.get('#email').type('email-invalido').blur()
    cy.get('#emailError').should('contain', 'email válido')
  })

  it('debe mostrar error si el mensaje tiene menos de 10 caracteres', () => {
    cy.get('#message').type('Corto').blur()
    cy.get('#messageError').should('contain', 'al menos 10 caracteres')
  })

  it('no debe permitir enviar el formulario con campos inválidos', () => {
    cy.get('#name').type('Jo')
    cy.get('#email').type('email-invalido')
    cy.get('button[type="submit"]').click()
    
    // No debe redirigir a feedback
    cy.url().should('include', 'contact.html')
    cy.url().should('not.include', 'feedback.html')
  })
})
```

### Paso 10: Crear test de la página de feedback

Crea el archivo `cypress/e2e/feedback.cy.js`:

```javascript
describe('Página de Feedback', () => {
  it('debe mostrar la información del formulario enviado', () => {
    // Primero completar y enviar el formulario
    cy.visit('/contact.html')
    cy.get('#name').type('María González')
    cy.get('#email').type('maria.gonzalez@example.com')
    cy.get('#phone').type('+54 11 9876-5432')
    cy.get('#subject').select('soporte')
    cy.get('#message').type('Necesito ayuda con un problema técnico que estoy experimentando')
    cy.get('#terms').check()
    cy.get('button[type="submit"]').click()

    // Verificar que se muestra la página de feedback
    cy.url().should('include', 'feedback.html')
    cy.contains('¡Formulario Enviado Exitosamente!')
    
    // Verificar que se muestran los datos enviados
    cy.contains('María González')
    cy.contains('maria.gonzalez@example.com')
    cy.contains('+54 11 9876-5432')
  })

  it('debe permitir volver al inicio desde feedback', () => {
    // Simular que venimos del formulario (usando sessionStorage)
    cy.window().then((win) => {
      win.sessionStorage.setItem('formData', JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        phone: '123456789',
        subject: 'Consulta General',
        message: 'Mensaje de prueba'
      }))
    })
    
    cy.visit('/feedback.html')
    cy.get('.feedback-actions a[href="index.html"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/index.html')
  })

  it('debe permitir enviar otro mensaje desde feedback', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('formData', JSON.stringify({
        name: 'Test User',
        email: 'test@test.com',
        phone: '123456789',
        subject: 'Consulta General',
        message: 'Mensaje de prueba'
      }))
    })
    
    cy.visit('/feedback.html')
    cy.get('.feedback-actions a[href="contact.html"]').click()
    cy.url().should('include', 'contact.html')
  })
})
```

---

## Mejores Prácticas

### 1. Usar Fixtures para datos de prueba

Crea `cypress/fixtures/test-data.json`:

```json
{
  "validUser": {
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "phone": "+54 11 1234-5678",
    "subject": "consulta",
    "message": "Este es un mensaje de prueba para el formulario de contacto"
  },
  "invalidEmails": [
    "email-sin-arroba",
    "@sin-dominio.com",
    "sin-dominio@",
    "espacios en email@test.com"
  ]
}
```

Uso en tests:

```javascript
cy.fixture('test-data').then((data) => {
  cy.get('#name').type(data.validUser.name)
  cy.get('#email').type(data.validUser.email)
})
```

### 2. Crear comandos personalizados

Edita `cypress/support/commands.js`:

```javascript
// Comando para completar el formulario de contacto
Cypress.Commands.add('fillContactForm', (userData) => {
  cy.get('#name').type(userData.name)
  cy.get('#email').type(userData.email)
  if (userData.phone) cy.get('#phone').type(userData.phone)
  cy.get('#subject').select(userData.subject)
  cy.get('#message').type(userData.message)
  cy.get('#terms').check()
})

// Comando para enviar el formulario
Cypress.Commands.add('submitContactForm', () => {
  cy.get('button[type="submit"]').click()
})

// Uso:
// cy.fillContactForm({ name: 'Test', email: 'test@test.com', ... })
// cy.submitContactForm()
```

### 3. Organizar tests con `describe` y `it`

- Usa `describe` para agrupar tests relacionados
- Usa `it` para tests individuales
- Usa `beforeEach` para configuración común

### 4. Selectores recomendados

**Preferir:**
- `data-cy` attributes: `cy.get('[data-cy="submit-button"]')`
- IDs: `cy.get('#name')`
- Clases semánticas: `cy.get('.contact-form')`

**Evitar:**
- Selectores CSS complejos: `cy.get('div > div > button:nth-child(2)')`
- Texto que puede cambiar: `cy.contains('Click aquí')` (solo si es necesario)

### 5. Esperas implícitas vs explícitas

Cypress espera automáticamente, pero a veces necesitas esperas explícitas:

```javascript
// Espera implícita (recomendado)
cy.get('#name').should('be.visible')

// Espera explícita (solo si es necesario)
cy.wait(1000) // Evitar si es posible
```

---

## Ejecución de Tests

### Modo Interactivo (Recomendado para desarrollo)

```bash
npm run cypress:open
```

**Ventajas:**
- Interfaz gráfica amigable
- Puedes ver los tests ejecutándose en tiempo real
- Útil para debugging
- Permite ejecutar tests individuales

### Modo Headless (Para CI/CD)

```bash
npm run cypress:run
```

**Ventajas:**
- Ejecución rápida
- Ideal para integración continua
- Genera reportes automáticos
- Puede ejecutarse en servidores sin interfaz gráfica

### Ejecutar un test específico

```bash
npx cypress run --spec "cypress/e2e/navigation.cy.js"
```

### Ejecutar en un navegador específico

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```
---
## Recursos Adicionales

- [Documentación oficial de Cypress](https://docs.cypress.io/)
- [Best Practices de Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Ejemplos de Cypress](https://example.cypress.io/)
- [Comunidad de Cypress](https://github.com/cypress-io/cypress)
