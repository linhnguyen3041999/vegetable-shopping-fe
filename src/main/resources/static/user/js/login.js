async function login() {
    const username = document.getElementById('user-username').value;
    const password = document.getElementById('user-password').value;
    await axios.post('http://localhost:8080/api/v1/login', {username, password})
        .then(response => {
            alert('Login successful');
            console.log(response.value)
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