document.addEventListener('DOMContentLoaded', () => {
    // --- Form & Container Selection ---
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- Button Selection ---
    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    // --- Event Listener for Toggling Forms ---
    showRegisterBtn.addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginBtn.addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // --- Event Listener for Password Visibility Toggles ---
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const inputGroup = icon.parentElement;
            const passwordInput = inputGroup.querySelector('input');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    });
    
    // --- Validation Helper Functions ---
    const setError = (input, message) => {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = message;
        inputGroup.classList.add('error');
    };

    const setSuccess = (input) => {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');
        errorDisplay.innerText = '';
        inputGroup.classList.remove('error');
    };

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // --- Login Form Submission & Validation ---
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        let isFormValid = true;
        
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');

        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required');
            isFormValid = false;
        } else {
            setSuccess(emailInput);
        }

        if (passwordInput.value.trim() === '') {
            setError(passwordInput, 'Password is required');
            isFormValid = false;
        } else {
            setSuccess(passwordInput);
        }

        if (isFormValid) {
            window.location.href = 'otp.html';
        }
    });

    // --- Register Form Submission & Validation ---
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        let isFormValid = true;
        
        const nameInput = document.getElementById('register-name');
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        // Name validation
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Full name is required');
            isFormValid = false;
        } else {
            setSuccess(nameInput);
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, 'Provide a valid email address');
            isFormValid = false;
        } else {
            setSuccess(emailInput);
        }

        // Password validation
        if (passwordInput.value.trim() === '') {
            setError(passwordInput, 'Password is required');
            isFormValid = false;
        } else if (passwordInput.value.trim().length < 8) {
            setError(passwordInput, 'Password must be at least 8 characters.');
            isFormValid = false;
        } else {
            setSuccess(passwordInput);
        }

        // Confirm password validation
        if (confirmPasswordInput.value.trim() === '') {
            setError(confirmPasswordInput, 'Please confirm your password');
            isFormValid = false;
        } else if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
            setError(confirmPasswordInput, "Passwords don't match");
            isFormValid = false;
        } else {
            setSuccess(confirmPasswordInput);
        }

        if (isFormValid) {
            window.location.href = 'otp.html';
        }
    });
});
