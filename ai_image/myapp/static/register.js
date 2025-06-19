document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const requirements = document.querySelectorAll('.requirement');

    // Password validation
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        // Check length
        const lengthValid = password.length >= 8;
        updateRequirement('length', lengthValid);
        
        // Check uppercase
        const uppercaseValid = /[A-Z]/.test(password);
        updateRequirement('uppercase', uppercaseValid);
        
        // Check number
        const numberValid = /[0-9]/.test(password);
        updateRequirement('number', numberValid);
        
        // Check special character
        const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        updateRequirement('special', specialValid);
    });

    // Update requirement status
    function updateRequirement(type, isValid) {
        const requirement = document.querySelector(`[data-requirement="${type}"]`);
        if (isValid) {
            requirement.classList.add('valid');
        } else {
            requirement.classList.remove('valid');
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if all password requirements are met
        const allRequirementsMet = Array.from(requirements).every(req => req.classList.contains('valid'));
        
        // Check if passwords match
        const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        
        if (!allRequirementsMet) {
            alert('Please meet all password requirements');
            return;
        }
        
        if (!passwordsMatch) {
            alert('Passwords do not match');
            return;
        }
        
        // If all validations pass, submit the form
        this.submit();
    });

    // Real-time password match check
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });
}); 