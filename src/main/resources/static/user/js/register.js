
async function register() {
    try {
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
        console.log(err.message);
    }
}