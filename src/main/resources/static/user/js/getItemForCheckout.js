const list = JSON.parse(localStorage.getItem("items"));
let result = '';
list.forEach(item =>{
    result += `<li>${item.product.productName} x ${item.quantity} <span>$${item.price}</span></li>`
});
document.getElementById('product_checkout').innerHTML = result;

const userInfor = JSON.parse(sessionStorage.getItem("userData"));
document.getElementById("fullname").value = userInfor.fullName;
document.getElementById("phone_number").value = userInfor.phoneNumber;

async function setAmount(){
    let shopping_fee = 20000;
    console.log(shopping_fee);
    document.getElementById('shipping-fee').textContent = '$' + shopping_fee;
    let totalAmount = await getAmount() - shopping_fee;
    document.getElementById('total-amount').textContent = '$' + `${totalAmount}`;
}
window.setAmount();