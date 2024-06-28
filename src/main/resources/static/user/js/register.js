
async function register() {
    try {
        validateRegister();
        let formData = new FormData();
        formData.append('username', document.getElementById('user-username').value);
        formData.append('password', document.getElementById('user-password').value);
        formData.append('email', document.getElementById('user-email').value);
        await axios.post('http://localhost:8080/api/v1/users', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        Swal.fire({
            title: 'Register',
            text: 'Create account successfully',
            icon: 'success',
            button: 'Oke'
        });
        setTimeout(function () {
            window.location.href = "/vegetable-shopping/home";
        }, 1000);
    } catch (err) {
        console.log(err);
        Swal.fire({
            title: 'Register',
            text: err.response.data.message,
            icon: 'error',
            button: 'Oke'
        });
    }
}

function validateRegister() {
    let password = document.getElementById('user-password').value;
    let confirmPassword = document.getElementById('user-ConfirmPassword').value;
    let username = document.getElementById('user-username').value;
    let email = document.getElementById('user-email').value;
    if (password !== confirmPassword) {
        document.getElementById('password-message').textContent = "Passwords not match!";
    }
    if (username.trim() === "") {
        document.getElementById('error-username').textContent = "Please enter a username";
    }
    if (email.trim() === "") {
        document.getElementById('error-email').textContent = "Please enter a email address";
    }
    if (password.trim() === "") {
        document.getElementById('error-password').textContent = "Please enter a password";
    }
    if (confirmPassword.trim() === "") {
        document.getElementById('error-confirm-password').textContent = "Please enter a confirmation password";
        return;
    }
}
