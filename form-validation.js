document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        terms: document.getElementById('terms')
    };

    const errorMessages = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError'),
        terms: document.getElementById('termsError')
    };

    // Validaciones en tiempo real
    inputs.name.addEventListener('blur', () => validateName());
    inputs.name.addEventListener('input', () => clearError('name'));

    inputs.email.addEventListener('blur', () => validateEmail());
    inputs.email.addEventListener('input', () => clearError('email'));

    inputs.phone.addEventListener('blur', () => validatePhone());
    inputs.phone.addEventListener('input', () => clearError('phone'));

    inputs.subject.addEventListener('change', () => validateSubject());
    inputs.message.addEventListener('blur', () => validateMessage());
    inputs.message.addEventListener('input', () => clearError('message'));
    inputs.terms.addEventListener('change', () => validateTerms());

    // Validación del formulario completo
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isValid = 
            validateName() &&
            validateEmail() &&
            validatePhone() &&
            validateSubject() &&
            validateMessage() &&
            validateTerms();

        if (isValid) {
            // Guardar datos en sessionStorage para mostrar en feedback
            const formData = {
                name: inputs.name.value.trim(),
                email: inputs.email.value.trim(),
                phone: inputs.phone.value.trim() || 'No proporcionado',
                subject: inputs.subject.options[inputs.subject.selectedIndex].text,
                message: inputs.message.value.trim()
            };

            sessionStorage.setItem('formData', JSON.stringify(formData));
            
            // Redirigir a la página de feedback
            window.location.href = 'feedback.html';
        }
    });

    // Funciones de validación
    function validateName() {
        const value = inputs.name.value.trim();
        if (!value) {
            showError('name', 'El nombre es requerido');
            return false;
        }
        if (value.length < 3) {
            showError('name', 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
            showError('name', 'El nombre solo puede contener letras y espacios');
            return false;
        }
        clearError('name');
        return true;
    }

    function validateEmail() {
        const value = inputs.email.value.trim();
        if (!value) {
            showError('email', 'El email es requerido');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError('email', 'Ingrese un email válido (ejemplo: usuario@correo.com)');
            return false;
        }
        clearError('email');
        return true;
    }

    function validatePhone() {
        const value = inputs.phone.value.trim();
        if (value && !/^[\d+\-\s()]+$/.test(value)) {
            showError('phone', 'El teléfono solo puede contener números, espacios, guiones y paréntesis');
            return false;
        }
        clearError('phone');
        return true;
    }

    function validateSubject() {
        if (!inputs.subject.value) {
            showError('subject', 'Debe seleccionar un asunto');
            return false;
        }
        clearError('subject');
        return true;
    }

    function validateMessage() {
        const value = inputs.message.value.trim();
        if (!value) {
            showError('message', 'El mensaje es requerido');
            return false;
        }
        if (value.length < 10) {
            showError('message', 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        clearError('message');
        return true;
    }

    function validateTerms() {
        if (!inputs.terms.checked) {
            showError('terms', 'Debe aceptar los términos y condiciones');
            return false;
        }
        clearError('terms');
        return true;
    }

    function showError(field, message) {
        errorMessages[field].textContent = message;
        inputs[field].style.borderColor = 'var(--error-color)';
    }

    function clearError(field) {
        errorMessages[field].textContent = '';
        if (inputs[field].checkValidity()) {
            inputs[field].style.borderColor = '';
        }
    }

    // Limpiar errores al resetear el formulario
    form.addEventListener('reset', function() {
        Object.keys(errorMessages).forEach(key => {
            clearError(key);
        });
    });
});
