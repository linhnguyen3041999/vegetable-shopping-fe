// count users
window.countUsers();
async function countUsers() {
    try {
        let {data : countUsers} = await axios.get('http://localhost:8080/api/v1/users/countUsers');
        document.getElementById('count-users').innerText = countUsers;
    } catch (e) {

    }
}

//count order
window.countOrderInWeek();
async function countOrderInWeek() {
    try {
        let {data : countOrderInWeek} = await axios.get('http://localhost:8080/api/v1/carts/countOrderInWeek');
        document.getElementById('count-order-in-7day').innerText = countOrderInWeek;
    } catch (e) {

    }
}
