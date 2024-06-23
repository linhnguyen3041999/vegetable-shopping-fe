const list = JSON.parse(localStorage.getItem("items"));
let result = '';
list.forEach(item =>{
    result += `<li>${item.product.productName} x ${item.quantity} <span>$${item.price}</span></li>`
});
document.getElementById('product_checkout').innerHTML = result;