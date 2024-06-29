
let token = JSON.parse(sessionStorage.getItem('token'));

async function loadOrderToTable() {
    try {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfor'));
        let userId = userInfo;
        console.log(userInfo);
        console.log(token);
        let {data : response} = await axios.get(`http://localhost:8080/api/v1/carts/getCartsByUserId/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response);
    } catch (e) {
        console.log(e.message);
    }
}

window.loadOrderToTable();
