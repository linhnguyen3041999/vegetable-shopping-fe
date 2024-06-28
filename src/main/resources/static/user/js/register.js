
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
            title: 'Category',
            text: 'Add category successfully',
            icon: 'success',
            button: 'Oke'
        });
    } catch (err) {
        console.log(err.message);
    }
}