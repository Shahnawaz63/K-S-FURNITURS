document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verify-btn');
    const resendBtn = document.getElementById('resend-btn');
    const feedbackText = document.querySelector('.feedback-text');
    const otpDisplay = document.getElementById('otp-display-dev');
    const infoText = document.querySelector('.info-text');

    let generatedOTP = '';
    
    // --- LocalStorage Utilities ---
    const getUsers = () => JSON.parse(localStorage.getItem('ksFurnitureUsers') || '[]');
    const saveUsers = (users) => localStorage.setItem('ksFurnitureUsers', JSON.stringify(users));
    
    // Retrieves user data passed from registration.js
    const pendingAuth = JSON.parse(localStorage.getItem('ksPendingAuth') || 'null');
    
    // Check if auth data exists, otherwise send user back to login
    if (!pendingAuth) {
        // Send user back if they directly accessed otp.html
        window.location.href = 'register.html'; 
        return;
    }

    // Update info text based on pending email
    if (pendingAuth.user && pendingAuth.user.email) {
        infoText.textContent = `A 4-digit code has been sent to ${pendingAuth.user.email}.`;
    }

    const generateAndDisplayOTP = () => {
        generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
        otpDisplay.textContent = `(Test OTP: ${generatedOTP})`;
        console.log(`Generated OTP: ${generatedOTP}`);
        inputs.forEach((input, index) => {
            input.value = '';
            input.disabled = index !== 0;
        });
        inputs[0].focus();
        feedbackText.textContent = '';
        verifyBtn.classList.remove('active');
    };

    const checkInputs = () => {
        const allFilled = [...inputs].every(input => input.value.length === 1);
        if (allFilled) {
            verifyBtn.classList.add('active');
        } else {
            verifyBtn.classList.remove('active');
        }
    };

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].disabled = false;
                inputs[index + 1].focus();
            }
            checkInputs();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index].disabled = true;
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').slice(0, inputs.length);
            [...pasteData].forEach((char, i) => {
                if (inputs[index + i]) {
                    inputs[index + i].value = char;
                    inputs[index + i].disabled = false;
                }
            });
            const lastPastedIndex = Math.min(index + pasteData.length, inputs.length) - 1;
            inputs[lastPastedIndex].focus();
            checkInputs();
        });
    });

    verifyBtn.addEventListener('click', () => {
        if (!verifyBtn.classList.contains('active')) return;

        const enteredOTP = [...inputs].map(input => input.value).join('');
        
        if (enteredOTP === generatedOTP) {
            feedbackText.textContent = 'Verification Successful! Redirecting...';
            feedbackText.style.color = 'var(--success-green)';
            
            // --- AUTHENTICATION SUCCESS LOGIC ---
            
            // If registering, save the new user
            if (pendingAuth.type === 'register') {
                const users = getUsers();
                users.push(pendingAuth.user);
                saveUsers(users);
            }
            
            // Set the logged-in state
            localStorage.setItem('ksCurrentUser', JSON.stringify(pendingAuth.user));
            
            // Clear pending auth data
            localStorage.removeItem('ksPendingAuth');

            // Redirect to the dashboard (index.html, which will detect the logged-in state)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        } else {
            feedbackText.textContent = 'Invalid OTP. Please try again.';
            feedbackText.style.color = 'var(--error-red)';
        }
    });
    
    resendBtn.addEventListener('click', generateAndDisplayOTP);

    generateAndDisplayOTP();
});