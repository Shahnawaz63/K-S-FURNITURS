document.addEventListener('DOMContentLoaded', () => {
    const recoverForm = document.getElementById('recoverForm');
    const emailInput = document.getElementById('recoverEmail');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    recoverForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting
        
        const emailValue = emailInput.value.trim();

        // Simple validation
        if (emailValue === '') {
            errorMessage.textContent = 'Email address is required.';
            emailInput.parentElement.classList.add('error');
            return;
        } else if (!isValidEmail(emailValue)) {
            errorMessage.textContent = 'Please provide a valid email address.';
            emailInput.parentElement.classList.add('error');
            return;
        }

        // On successful validation
        errorMessage.textContent = '';
        emailInput.parentElement.classList.remove('error');

        // Hide the form and show the success message
        recoverForm.style.display = 'none';
        successMessage.textContent = `If an account with the email ${emailValue} exists, you will receive a password reset link shortly.`;
        successMessage.style.display = 'block';

        console.log(`Password recovery initiated for: ${emailValue}`);
    });

    // Email validation helper function
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
