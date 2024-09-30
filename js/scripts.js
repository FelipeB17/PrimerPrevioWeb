document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Aquí normalmente harías una llamada a la API, pero por ahora usaremos una verificación simple
        if (username === 'mor_2314' && password === '83r5^_') {
            // Credenciales correctas, redirigir a la página principal
            window.location.href = 'main.html';
        } else {
            // Credenciales incorrectas, mostrar mensaje de error
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.style.display = 'block';
        }
    });
});