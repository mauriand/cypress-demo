# TechSolutions - Aplicación Web de Demostración

Esta es una aplicación web simple diseñada para demostrar y practicar testing con Cypress. La aplicación incluye navegación entre páginas, un formulario de contacto con validaciones y una página de feedback.

## Características

- **Página Principal**: Página de inicio con navegación y descripción de la aplicación
- **Formulario de Contacto**: Formulario completo con validaciones en tiempo real
  - Validación de nombre (mínimo 3 caracteres, solo letras)
  - Validación de email (formato correcto)
  - Validación de teléfono (opcional, formato válido)
  - Validación de asunto (selección requerida)
  - Validación de mensaje (mínimo 10 caracteres)
  - Validación de términos y condiciones (checkbox requerido)
- **Página de Feedback**: Muestra confirmación después de enviar el formulario correctamente

## Estructura del Proyecto

```
app-demo/
├── index.html              # Página principal
├── contact.html            # Formulario de contacto
├── feedback.html           # Página de confirmación
├── styles.css              # Estilos de la aplicación
├── form-validation.js      # Validaciones del formulario
├── feedback.js             # Lógica de la página de feedback
├── server.js               # Servidor Express simple
├── package.json            # Dependencias del proyecto
└── README.md              # Este archivo
```

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Uso

1. Iniciar el servidor de desarrollo:
```bash
npm start
```

2. Abrir el navegador en: `http://localhost:3000`

3. Navegar por la aplicación:
   - Visitar la página principal
   - Ir al formulario de contacto
   - Completar y enviar el formulario
   - Ver la página de feedback con los datos enviados

## Validaciones del Formulario

El formulario incluye las siguientes validaciones:

- **Nombre**: Requerido, mínimo 3 caracteres, solo letras y espacios
- **Email**: Requerido, formato de email válido
- **Teléfono**: Opcional, solo números, espacios, guiones y paréntesis
- **Asunto**: Requerido, debe seleccionar una opción
- **Mensaje**: Requerido, mínimo 10 caracteres
- **Términos**: Requerido, debe estar marcado

Los errores se muestran en tiempo real mientras el usuario completa el formulario.

## Próximos Pasos

Esta aplicación está lista para agregar tests con Cypress. Los tests pueden cubrir:

- Navegación entre páginas
- Validación de campos del formulario
- Envío exitoso del formulario
- Verificación de mensajes de error
- Verificación de la página de feedback

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y diseño responsivo)
- JavaScript (Vanilla JS)
- Express.js (servidor simple)

