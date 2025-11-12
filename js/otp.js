document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verify-btn');
    const resendBtn = document.getElementById('resend-btn');
    const feedbackText = document.querySelector('.feedback-text');
    const otpDisplay = document.getElementById('otp-display-dev');

    let generatedOTP = '';

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
            feedbackText.textContent = 'Verification Successful!';
            feedbackText.style.color = 'var(--success-green)';
            
            // --- CHANGE: Added redirect to index.html after 1.5 seconds ---
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

