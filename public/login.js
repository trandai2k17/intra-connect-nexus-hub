// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.querySelector('.button-text');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const eyeIcon = this.querySelector('.eye-icon');
        if (type === 'text') {
            eyeIcon.innerHTML = `
                <path d="m9.88 9.88 4.24 4.24"/>
                <path d="m10.73 5.08 1.88.88-1.12 1.12"/>
                <path d="m15.5 7.5 1.88.88"/>
                <path d="M2.5 3 19 3"/>
                <path d="M12 12.5c-1.38 0-2.5-1.12-2.5-2.5"/>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
            `;
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
        
        // Simulate login process
        setTimeout(() => {
            // Hide loading state
            submitButton.disabled = false;
            buttonText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            
            // Show success message (you can replace this with actual redirect)
            alert('Đăng nhập thành công!');
            
            // In a real application, you would redirect here:
            // window.location.href = '/dashboard';
        }, 1500);
    });

    // Add focus effects to inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});