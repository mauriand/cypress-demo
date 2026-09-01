document.addEventListener('DOMContentLoaded', function() {
    const feedbackInfo = document.getElementById('feedbackInfo');
    
    // Obtener datos del formulario desde sessionStorage
    const formDataStr = sessionStorage.getItem('formData');
    
    if (formDataStr) {
        const formData = JSON.parse(formDataStr);
        
        // Mostrar la información del formulario
        feedbackInfo.innerHTML = `
            <h3>Detalles del Mensaje Enviado</h3>
            <p><strong>Nombre:</strong> ${escapeHtml(formData.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
            <p><strong>Teléfono:</strong> ${escapeHtml(formData.phone)}</p>
            <p><strong>Asunto:</strong> ${escapeHtml(formData.subject)}</p>
            <p><strong>Mensaje:</strong> ${escapeHtml(formData.message)}</p>
        `;
        
        // Limpiar sessionStorage después de mostrar
        sessionStorage.removeItem('formData');
    } else {
        // Si no hay datos, mostrar mensaje y redirigir
        feedbackInfo.innerHTML = '<p>No se encontraron datos del formulario. Será redirigido al formulario de contacto.</p>';
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 3000);
    }
});

// Función para escapar HTML y prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
