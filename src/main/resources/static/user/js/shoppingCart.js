async function getAllItem() {
    try {
        //let {data: cartItems} = await axios.get('http://localhost:8080/api/v1/cart');
        let result = '';
        await addCookie();
        const cookieValue = await getCookie();
        cookieValue.forEach(cartItem => {
                result += `
                                <tr>
                                    <td class="shoping__cart__item">
                                        <img src="/user/template/img/product/${cartItem.product.photo}" alt="">
                                        <h5>${cartItem.product.productName}</h5>
                                    </td>
                                    <td class="shoping__cart__price">
                                        ${cartItem.product.price}
                                    </td>
                                    <td class="shoping__cart__quantity">
                                        <div class="quantity">
                                            <div class="pro-qty">
                                                <span id="minus-${cartItem.cartItemId}" class="qtybtn">-</span>
                                                <input type="text" value="${cartItem.quantity}">
                                                <span id="plus-${cartItem.cartItemId}" class="qtybtn">+</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="shoping__cart__total">
                                        ${cartItem.price}
                                    </td>
                                    <td class="shoping__cart__item__close">
                                        <span id="icon_close_${cartItem.cartItemId}" class="icon_close"></span>
                                    </td>
                                </tr>                        
                    `;
            });

        document.getElementById('tbody-cart-items').innerHTML = result;

        cookieValue.forEach(cartItem => {
            // Delete
            let productDelete = document.getElementById(`icon_close_${cartItem.cartItemId}`);
            productDelete.addEventListener('click', async () => {
                try {
                    let userConfirmed = confirm("Are you sure you want to delete?");
                    if (userConfirmed) {
                        await axios.delete(`http://localhost:8080/api/v1/cart/${cartItem.cartItemId}`);
                        getAllItem();
                        getAmount();
                        getCount();
                        await addCookie();
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
            //Minus
            let productMinus = document.getElementById(`minus-${cartItem.cartItemId}`);
            productMinus.addEventListener('click', async () => {
                try {
                        await axios.put(`http://localhost:8080/api/v1/cart/${cartItem.cartItemId}/minus`);
                        getAllItem();
                        getAmount();
                        getCount();
                        await addCookie();
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            //Plus
            let productPlus = document.getElementById(`plus-${cartItem.cartItemId}`);
            productPlus.addEventListener('click', async () => {
                try {
                    await axios.put(`http://localhost:8080/api/v1/cart/${cartItem.cartItemId}/plus`);
                    getAllItem();
                    getAmount();
                    getCount();
                    await addCookie();
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}
window.getAllItem();
window.getCookie();