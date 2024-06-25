async function addOrder(){
    let shipping_fee = document.getElementById('shipping-fee').textContent;
    let total_amount = document.getElementById('total-amount').textContent;
    let user = JSON.parse(sessionStorage.getItem('userData'));

    let formData = new FormData();
    formData.append('addressShipping', document.getElementById('address_shipping').value);
    formData.append('cartStatus', 'WAIT_FOR_CONFIRMATION');
    formData.append('note', document.getElementById('note').value);
    formData.append('paymentMethod',  getSelectedRadio());
    formData.append('paymentStatus', getSelectedRadio() === 'true' ? 'false' : 'true');
    formData.append('shippingFee', parseFloat(shipping_fee.slice(1)));
    formData.append('totalAmount', parseFloat(total_amount.slice(1)));
    formData.append('userId', user.userId);

    const nameValue1 = formData.get('paymentMethod');
    const nameValue2 = formData.get('paymentStatus');
    console.log(nameValue1);
    console.log(nameValue2);
    try {
        let order = await axios.post('http://localhost:8080/api/v1/carts', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let itemList = [];
        if(localStorage.getItem("items")){
            itemList = JSON.parse(localStorage.getItem("items"));
        }
        const cartItems = itemList;
        for (const cartItem of cartItems) {
            let formDataItem = new FormData();
            formDataItem.append('quantity', cartItem.quantity);
            formDataItem.append('price', cartItem.price);
            formDataItem.append('productId', cartItem.product.productId);
            formDataItem.append('cartId', order.data.cartId);

            try {
                await axios.post('http://localhost:8080/api/v1/cartItems', formDataItem , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error("Lỗi khi tạo sản phẩm trong giỏ hàng:", error);
            }
        }

        Swal.fire({
            title: 'Success',
            text: 'You have paid for your order',
            icon: 'success'
        });
    }catch (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You were unable to pay, please try again",
        });
    }

}

function getSelectedRadio() {
    const selectedRadio = document.querySelector('input[name="payment_method"]:checked');
    if (!selectedRadio.isNull) {
        return selectedRadio.value;
    }
}

document.getElementById('order_submit').addEventListener('click', function (evt){
    evt.preventDefault();
    if(!getSelectedRadio().isNull){
        addOrder();
    }
});