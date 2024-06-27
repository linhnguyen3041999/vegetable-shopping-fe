async function itemUser() {
    try {
        const username = sessionStorage.getItem('userName');
        const userResponse = await axios.get(`http://localhost:8080/api/v1/users/${username}`);

        // Update UI elements
        document.getElementById('fullname').value = userResponse.data.fullname || 'N/A'; // Set default if fullName is missing
        document.getElementById('phone_number').value = userResponse.data.phoneNumber || 'N/A';

        // Return user ID as a string (assuming it's already a string)
        return userResponse.data.userId; // Explicit conversion if necessary
    } catch (error) {
        console.error('Error fetching user:', error);
        // Handle errors gracefully, e.g., display an error message to the user
    }
}


async function addOrder(){
    const userToken = sessionStorage.getItem('token');
    let shipping_fee = document.getElementById('shipping-fee').textContent;
    let total_amount = document.getElementById('total-amount').textContent;

    const userId = await itemUser();

    let formData = new FormData();
    formData.append('addressShipping', document.getElementById('address_shipping').value);
    formData.append('cartStatus', 'WAIT_FOR_CONFIRMATION');
    formData.append('note', document.getElementById('note').value);
    formData.append('paymentMethod',  getSelectedRadio());
    formData.append('paymentStatus', getSelectedRadio() === 'true' ? 'false' : 'true');
    formData.append('shippingFee', parseFloat(shipping_fee.slice(1)));
    formData.append('totalAmount', parseFloat(total_amount.slice(1)));
    formData.append('userId', userId);


    try {
        let order = await axios.post('http://localhost:8080/api/v1/carts', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let itemList = [];
        if(localStorage.getItem("items")){
            itemList = JSON.parse(localStorage.getItem("items"));
        }
        const cartItems = itemList;
        let isOK = true;
        let theErrorOfItem = '';
        for (const cartItem of cartItems) {
            let formDataItem = new FormData();
            formDataItem.append('quantity', cartItem.quantity);
            formDataItem.append('price', cartItem.price);
            formDataItem.append('productId', cartItem.product.productId);
            formDataItem.append('cartId', order.data.cartId);
            try {
                const cartItemResponse = await axios.post('http://localhost:8080/api/v1/cartItems', formDataItem , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log(cartItemResponse.data);
                if(cartItemResponse.data === ''){
                    isOK = false;
                    theErrorOfItem += 'The quantity of ' + cartItem.product.productName + "is greater than the inventory quantity " + "(" + cartItem.product.quantity + ').\n';
                }

            } catch (error) {
                console.error("Failed to create some cart items:", error);
            }
        }
        //Check if all cart items were successfully created before clearing localStorage
        if(isOK && theErrorOfItem === ''){
            localStorage.removeItem("items");
            Swal.fire({
                title: 'Success',
                text: 'You have paid for your order',
                icon: 'success'
            })
            setTimeout(function () {
                window.location.href = "/vegetable-shopping/home";
            }, 1000);
        }else{
            await axios.delete(`http://localhost:8080/api/v1/carts/${order.data.cartId}`);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: theErrorOfItem,
                showCancelButton: true,
                confirmButtonText: "Go to cart",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/vegetable-shopping/shopping-cart';
                }
            });
            console.error("Failed to create some cart items.");
        }

    }catch (error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You were unable to pay, please try again",
        });
        console.error(error);
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

window.itemUser();