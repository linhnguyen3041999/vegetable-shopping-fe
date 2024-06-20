function my_submit() {
    error = "";
    userName = document.getElementById("user-username").value;
    email = document.getElementById("user-email").value;
    password = document.getElementById("user-password").value;
    confirmPassword = document.getElementById("user-ConfirmPassword").value;



}

function comparePasswords(password, confirmPassword) {
    let result = {
        isMatch: false,
        message: ""
    };
    if (password === confirmPassword) {
        result.isMatch = true;
        result.message = "Mật khẩu khớp nhau.";
    } else {
        result.message = "Mật khẩu không khớp. Vui lòng kiểm tra lại.";
    }
    return result;
}

function validateUsername(userName){
    const minLength = 50;
    if(userName === "" && userName.null){
        return "Please fill your username";
    }else if(userName.lenghth > minLength){
        return "Your username is too long"
    }else{
        return userName;
    }
}

function validateEmail(email){
    const minLength = 50;
    if(email === "" && email.null){
        return "Please fill your email";
    }else if(email.lenghth > minLength){
        return "Your email is too long"
    }else{
        return email;
    }
}

function validatePassword(password) {
    const minLength = 8;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    let result = {
        isValid: true,
        message: "Mật khẩu hợp lệ"
    };

    if (password.length < minLength) {
        result.isValid = false;
        result.message = `Mật khẩu phải có ít nhất ${minLength} ký tự.`;
        return result;
    }
    if (!hasLetter.test(password)) {
        result.isValid = false;
        result.message = "Mật khẩu phải chứa ít nhất một chữ cái.";
        return result;
    }
    if (!hasNumber.test(password)) {
        result.isValid = false;
        result.message = "Mật khẩu phải chứa ít nhất một chữ số.";
        return result;
    }
    if (!specialChars.test(password)) {
        result.isValid = false;
        result.message = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
        return result;
    }
    return result;
}
