document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit-registration').addEventListener('click', function () {
        handleSubmit("registration-from");
    });
    document.getElementById('submit-update').addEventListener('click', function () {
        handleSubmit("update-from");
    });
});

function handleSubmit(formId) {
    let form = document.getElementById(formId);
    let formType = form.getAttribute('data-form-type');
    let formData = {
        username: form.querySelector("#" + formId.split('-')[0] + "-username").value,
        email: form.querySelector("#" + formId.split('-')[0] + "-email").value,
        password: form.querySelector("#" + formId.split('-')[0] + "-password").value,
        confirmPassword: form.querySelector("#" + formId.split('-')[0] + "-confirm-password").value
    };

    if (formType === 'update') {
        formData.fullname = form.querySelector("#update-fullname").value;
        formData.phone = form.querySelector("#update-phone").value;
        formData.gender = form.querySelector("input[name='gender']:checked").value;
        formData.dob = form.querySelector("#update-dob").value;
        formData.address = form.querySelector("#update-address").value;
    }


    let usernameError = validateUsername(formData.username);
    if (usernameError !== formData.username) {
        showAlert('Error', usernameError);
        return;
    }

    let emailError = validateEmail(formData.email);
    if (emailError !== formData.email) {
        showAlert('Error', emailError);
        return;
    }

    if (!isValidEmail(formData.email)) {
        showAlert('Error', 'Invalid email format');
        return;
    }

    if (formType === 'registration' || (formType === 'update' && formData.password)) {
        let passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            showAlert('Error', passwordValidation.message);
            return;
        }

        let compareResult = comparePasswords(formData.password, formData.confirmPassword);
        if (!compareResult.isMatch) {
            showAlert('Error', compareResult.message);
            return;
        }
    }

    sendDataToServer(formData, formType);
}

function registerForm() {
    let formData = {
        username: document.getElementById("user-username").value,
        email: document.getElementById("user-email").value,
        password: document.getElementById("user-password").value,
        confirmPassword: document.getElementById("user-ConfirmPassword").value
    };

    let usernameError = validateUsername(formData.username);
    console.log(usernameError)
    if (usernameError !== formData.username) {
        Swal.fire({
            title: 'Error',
            text: usernameError,
            icon: 'error',
            confirmButtonText: 'Oke'
        });
        return;
    }

    let emailError = validateEmail(formData.email);
    if (emailError !== formData.email) {
        Swal.fire({
            title: 'Error',
            text: emailError,
            icon: 'error',
            confirmButtonText: 'Oke'
        });
        return;
    }

    if (!isValidEmail(formData.email)) {
        Swal.fire({
            title: 'Error',
            text: 'Invalid email format',
            icon: 'error',
            confirmButtonText: 'Oke'
        });
        return;
    }

    let passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
        Swal.fire({
            title: 'Error',
            text: passwordValidation.message,
            icon: 'error',
            confirmButtonText: 'Oke'
        });
        return;
    }

    let compareResult = comparePasswords(formData.password, formData.confirmPassword);
    if (!compareResult.isMatch) {
        Swal.fire({
            title: 'Error',
            text: compareResult.message,
            icon: 'error',
            confirmButtonText: 'Oke'
        });
        return;
    }
    sendDataToServer(formData);
}

function sendDataToServer(formData) {
    axios.post('http://localhost:8080/api/v1/users', formData)
        .then(response => {
            Swal.fire({
                title: 'Registration',
                text: 'Registration successful',
                icon: 'success',
                confirmButtonText: 'Oke'
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Registration',
                text: 'Registration failed',
                icon: 'error',
                confirmButtonText: 'Oke'
            });
        });
}

function validateUsername(userName) {
    const minLength = 50;
    if (userName === "" || userName == null) {
        return "Please fill your username";
    } else if (userName.length > minLength) {
        return "Your username is too long";
    } else {
        return userName;
    }
}

function validateEmail(email) {
    const minLength = 50;
    if (email === "" || email == null) {
        return "Please fill your email";
    } else if (email.length > minLength) {
        return "Your email is too long";
    } else {
        return email;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const minLength = 8;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    let result = {
        isValid: true,
        message: "password is valid"
    };

    if (password.length < minLength) {
        result.isValid = false;
        result.message = `Password must be at least ${minLength} characters long`;
        return result;
    }
    if (!hasLetter.test(password)) {
        result.isValid = false;
        result.message = "Password must contain at least one letter";
        return result;
    }
    if (!hasNumber.test(password)) {
        result.isValid = false;
        result.message = "Password must contain at least one number";
        return result;
    }
    if (!specialChars.test(password)) {
        result.isValid = false;
        result.message = "Password must contain at least one special character";
        return result;
    }
    return result;
}

function comparePasswords(password, confirmPassword) {
    let result = {
        isMatch: false,
        message: ""
    };
    if (password === confirmPassword) {
        result.isMatch = true;
        result.message = "Passwords match";
    } else {
        result.message = "Passwords do not match. Please check again";
    }
    return result;
}
