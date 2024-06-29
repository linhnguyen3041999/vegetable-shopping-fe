function checkLogin1() {
    let checkValue = JSON.parse(sessionStorage.getItem('userName'));
    console.log(checkValue);
    let userMenuContent1 = document.getElementById('userMenuContent1');
    let userMenuContent2 = document.getElementById('userMenuContent');
    console.log(userMenuContent);
    if (checkValue == null) {
        userMenuContent1.innerHTML = `
                <a href="./user/login">Login</a>
                <a href="./user/register">Register</a>
            `;
        userMenuContent2.innerHTML = `
                <a href="./user/login">Login</a>
                <a href="./user/register">Register</a>
            `;
    } else {
        userMenuContent1.innerHTML = `
                <a onclick="checkout_logged()" href="./user/update-account">Update account</a>
                <a href="./user/change-password">Change password</a>
            `;
        userMenuContent2.innerHTML = `
                <a onclick="checkout_logged()" href="./user/update-account">Update account</a>
                <a href="./user/change-password">Change password</a>
            `;
    }
}
checkLogin1();