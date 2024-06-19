function my_submit() {
    //catch error
    error = "";
    userName = document.getElementById("form3Example1cg").value;
    email = document.getElementById("form3Example3cg").value;
    password = document.getElementById("form3Example4cg").value;
    confirmPassword = document.getElementById("form3Example4cdg").value;

    validatePassword(password);
    comparePasswords(password, confirmPassword);
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
