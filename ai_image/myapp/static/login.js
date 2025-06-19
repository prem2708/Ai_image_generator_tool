document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const rememberCheckbox = document.getElementById('remember');

    // Check if there's a saved username
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername && rememberCheckbox) {
        document.getElementById('username').value = savedUsername;
        rememberCheckbox.checked = true;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        
        // Save username if "Remember me" is checked
        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
        
        // Submit the form
        this.submit();
    });

    // Add shake animation for invalid credentials
    const addShakeAnimation = () => {
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    };

    // Check for error messages
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        addShakeAnimation();
    }
}); 