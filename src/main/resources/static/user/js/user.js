document.getElementById('registrationForm').addEventListener('submit', my_submit);

function register() {
    axios.post("http://localhost:8081/user/register", {
        username: document.getElementById('user-username').value,
        password: document.getElementById("user-password").value
    }).then(() => {
        alert("Dang ky thanh cong")
    })
}


function my_submit(event) {
    let formData = {
        userName: document.getElementById("user-username").value,
        email: document.getElementById("user-email").value,
        password: document.getElementById("user-password").value,
        confirmPassword: document.getElementById("user-ConfirmPassword").value
    };

    if (validateUsername(formData.userName)) {
        if (validateEmail(formData.email)) {
            if (validatePassword(formData.password)) {
                if (comparePasswords(formData.password, formData.confirmPassword)) {
                    if (sendDataToServer(formData)) {
                        alert("register success")
                    } else {
                        alert("already have this username in database")
                    }
                } else {
                    alert("password do not match");
                }
            } else {
                alert("password invalid");
            }
        } else {
            alert("email invalid");
        }
    } else {
        alert("username invalid");
    }
}

// Check if username validation returned an error
//     let usernameError = validateUsername(formData.userName);
//     if (usernameError !== formData.userName) {
//         swal({
//             title: 'Error',
//             text: usernameError,
//             icon: 'error',
//             button: 'Oke'
//         });
//     }

// Check if email validation returned an error
//     let emailError = validateEmail(formData.email);
//     if (emailError !== formData.email) {
//         swal({
//             title: 'Error',
//             text: emailError,
//             icon: 'error',
//             button: 'Oke'
//         });
//     }

// Check if email format is valid
//     if (!isValidEmail(formData.email)) {
//         swal({
//             title: 'Error',
//             text: 'Invalid email format',
//             icon: 'error',
//             button: 'Oke'
//         });
//     }

// Validate password strength
//     let passwordValidation = validatePassword(formData.password);
//     if (!passwordValidation.isValid) {
//         swal({
//             title: 'Error',
//             text: passwordValidation.message,
//             icon: 'error',
//             button: 'Oke'
//         });
//     }

// Validate password and confirm password match
//     let compareResult = comparePasswords(formData.password, formData.confirmPassword);
//     if (!compareResult.isMatch) {
//         swal({
//             title: 'Error',
//             text: compareResult.message,
//             icon: 'error',
//             button: 'Oke'
//         });
//     }


function sendDataToServer(formData) {
    axios.post('http://localhost:8081/vegetable-shopping/register', formData)
        .then(response => {
            swal({
                title: 'Registration',
                text: 'Registration successful',
                icon: 'success',
                button: 'Oke'
            });
            // Additional steps after successful registration
        })
        .catch(error => {
            swal({
                title: 'Registration',
                text: 'Registration failed',
                icon: 'error',
                button: 'Oke'
            });
        });
}

function validateUsername(userName) {
    const minLength = 50;
    if (userName === "" && userName.null) {
        return "Please fill your username";
    } else if (userName.lenghth > minLength) {
        return "Your username is too long"
    } else {
        return userName;
    }
}

function validateEmail(email) {
    const minLength = 50;
    if (email === "" && email.null) {
        return "Please fill your email";
    } else if (email.lenghth > minLength) {
        return "Your email is too long"
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
