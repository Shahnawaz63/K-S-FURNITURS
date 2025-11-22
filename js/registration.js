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

    // --- LocalStorage Utilities ---
    // Simulates a database: stores all registered users
    const getUsers = () => JSON.parse(localStorage.getItem('ksFurnitureUsers') || '[]');
    const saveUsers = (users) => localStorage.setItem('ksFurnitureUsers', JSON.stringify(users));

    // Used to pass data to OTP page temporarily
    const setPendingUser = (user, type) => localStorage.setItem('ksPendingAuth', JSON.stringify({ user, type }));


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
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. Email check
        if (email === '') {
            setError(emailInput, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(email)) {
            setError(emailInput, 'Provide a valid email address');
            isFormValid = false;
        } else {
            setSuccess(emailInput);
        }

        // 2. Password check
        if (password === '') {
            setError(passwordInput, 'Password is required');
            isFormValid = false;
        } else {
            setSuccess(passwordInput);
        }

        // 3. User Authentication Check
        if (isFormValid) {
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // If credentials are correct, set the pending user and proceed to OTP
                setPendingUser(user, 'login');
                window.location.href = 'otp.html';
            } else {
                setError(passwordInput, 'Invalid email or password.');
                isFormValid = false;
            }
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

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // 1. Name validation
        if (name === '') {
            setError(nameInput, 'Full name is required');
            isFormValid = false;
        } else {
            setSuccess(nameInput);
        }

        // 2. Email validation
        const users = getUsers();
        if (email === '') {
            setError(emailInput, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(email)) {
            setError(emailInput, 'Provide a valid email address');
            isFormValid = false;
        } else if (users.some(u => u.email === email)) {
            setError(emailInput, 'Account already exists for this email.');
            isFormValid = false;
        } else {
            setSuccess(emailInput);
        }

        // 3. Password validation
        if (password === '') {
            setError(passwordInput, 'Password is required');
            isFormValid = false;
        } else if (password.length < 8) {
            setError(passwordInput, 'Password must be at least 8 characters.');
            isFormValid = false;
        } else {
            setSuccess(passwordInput);
        }

        // 4. Confirm password validation
        if (confirmPassword === '') {
            setError(confirmPasswordInput, 'Please confirm your password');
            isFormValid = false;
        } else if (password !== confirmPassword) {
            setError(confirmPasswordInput, "Passwords don't match");
            isFormValid = false;
        } else {
            setSuccess(confirmPasswordInput);
        }

        if (isFormValid) {
            // New User Data payload
            const newUser = {
                name: name,
                email: email,
                password: password, // In a real app, this would be hashed!
                memberSince: new Date().toLocaleDateString(),
                orders: 0,
                lastLogin: new Date().toLocaleString()
            };
            
            // Set the pending user data and redirect to OTP
            setPendingUser(newUser, 'register');
            window.location.href = 'otp.html';
        }
    });
});