document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-normal').addEventListener('click', updatePasswordForm);
});

function updatePasswordForm() {
    let formData = {
        username: document.getElementById("user-username").value,
        email: document.getElementById("user-email").value,
        confirmPassword: document.getElementById("user-ConfirmPassword").value
    };


}
