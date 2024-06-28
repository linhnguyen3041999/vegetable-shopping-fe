console.log(sessionStorage.getItem('userInfor'));

window.onload = function () {
    loadDataToForm()
};
async function loadDataToForm(){
    try {
        let userInfo = sessionStorage.getItem('userInfor');
        document.getElementById('user-full-name').placeholder = userInfo.fullname;
        document.getElementById('user-email').placeholder = userInfo.email;
        document.getElementById('user-phone-number').placeholder = userInfo.phoneNumber;
        userInfo.gender === 'male' ? document.getElementById('male').checked : document.getElementById('female').checked;
        document.getElementById('user-day-of-birth').placeholder = userInfo.dayOfBirth;
        document.getElementById('user-address').placeholder = userInfo.address
    } catch (e) {
        console.log(e.message);
    }
}
async function updateAccount() {
    try {
        let userId = 15
        let formData = new FormData();
        formData.append('fullname', document.getElementById('user-full-name').value);
        formData.append('email', document.getElementById('user-email').value);
        formData.append('phoneNumber', document.getElementById('user-phone-number').value);
        formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
        formData.append('dayOfBirth', document.getElementById('user-day-of-birth').value);
        formData.append('address', document.getElementById('user-address').value);

        await axios.put(`http://localhost:8080/api/v1/users/${userId}`, formData)
        Swal.fire({
            title: 'Update',
            text: 'Update account successfully',
            icon: 'success',
            button: 'OK'
        })
        setTimeout(function () {
            window.location.href = "/vegetable-shopping/home";
        }, 1000);
    } catch (err) {
        console.log(err.message);
    }
}
function checkout_logged(){
    if(sessionStorage.getItem("token")){
        window.location.href = '/vegetable-shopping/shopping-cart/checkout';
    }else{
        Swal.fire({
            title: "You are not logged in!",
            text: "To be able to pay, please log in first!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/vegetable-shopping/user/login';
            }
        });
    }
}