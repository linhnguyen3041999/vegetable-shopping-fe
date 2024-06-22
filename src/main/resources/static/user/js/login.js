async function login() {
    const username = document.getElementById('user-username').value;
    const password = document.getElementById('user-password').value;
    await axios.post('http://localhost:8080/api/v1/login', {username, password})
        .then(response => {
            swal({
                title: "Login successful!",
                text: "You login successful!",
                icon: "success",
                button: "OK",
            }).then((value) => {
                if (response.data && response.data.nameRole === 'ROLE_USER') {
                    sessionStorage.setItem('userData', JSON.stringify(response.data));
                    setTimeout(function () {
                        window.location.href = "/vegetable-shopping/home";
                    }, 1000);
                }else if(response.data && response.data.nameRole === 'ROLE_ADMIN'){
                    sessionStorage.setItem('userData', JSON.stringify(response.data));
                    setTimeout(function () {
                        window.location.href = "/admin/index";
                    }, 1000);
                }
            });

        })
        .catch(error => {
            alert('Login fail: ' + error.message);
        });
}
document.getElementById('login-normal').addEventListener('click',
    function (event) {
        event.preventDefault();
        login();
})