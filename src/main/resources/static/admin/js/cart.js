window.getAllCartToTable();

async function getAllCartToTable() {
    try {
        let {data: carts} = await axios.get('http://localhost:8080/api/v1/carts');
        let result = '';
        carts.forEach(cart => {
            let paymentMethodDisplay = cart.paymentMethod ? 'Payment on delivery' : 'Oline payment';
            let paymentStatusDisplay = cart.paymentMethod ? 'Unpaid' : 'Paid';
            result += `
                 <tr>
                    <td>${cart.cartId}</td>
                    <td>${cart.createdDate}</td>
                    <td>${paymentMethodDisplay}</td>
                    <td>${paymentStatusDisplay}</td>
                    <td>${cart.cartStatus}</td>
                    <td>${cart.addressShipping}</td>
                    <td>${cart.shippingFee}</td>
                    <td>${cart.totalAmount}</td>
                    <td>
                        <button id="order-table-edit-${cart.cartId}" class="btn btn-warning"><i class="fas fa-edit"></i></button>
                        <button id="order-table-show-${cart.cartId}" class="btn btn-danger"><i class="fa-regular fa-eye"></i></i></button>
                    </td>
                </tr>
            `;
        })
        document.getElementById('order-table').innerHTML = result;

        carts.forEach(cart => {
            let cartEdit = document.getElementById(`order-table-edit-${cart.cartId}`);
            cartEdit.addEventListener('click', async () => {
                try {
                    let {data: response} = await axios.get(`http://localhost:8080/api/v1/carts/${cart.cartId}`);
                    document.getElementById('order-id').value = response.cartId;
                    document.getElementById('order-status').value = response.cartStatus;
                } catch (e) {
                    Swal.fire({
                        title: 'Cart',
                        text: 'Load cart to form failed',
                        icon: 'warning',
                        button: 'Oke'
                    });
                }
            })

            let cartShow = document.getElementById(`order-table-show-${cart.cartId}`);
            cartShow.addEventListener('click', async () => {
                try {
                    let {data: response} = await axios.get(`http://localhost:8080/api/v1/cartItems/${cart.cartId}`);
                    console.log(response)
                    let tableContent = `<table class="table table-bordered table-hover">`;
                    tableContent += `
                                        <thead>
                                             <tr>
                                                 <th>STT</th>
                                                 <th>Name</th>
                                                 <th>Price</th>
                                                 <th>Quantity</th>
                                                 <th>Total Price</th>
                                             </tr>
                                        </thead>
                                    `;
                    tableContent += `<tbody>`;
                    response.forEach((item, index = 0) => {
                        tableContent += `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td>${item.product.productName}</td>
                                                <td>${item.product.price}</td>
                                                <td>${item.quantity}</td>
                                                <td>${item.price}</td>
                                            </tr>
                                        `;
                    });
                    tableContent += `</tbody></table>`;
                    Swal.fire.fire({
                        title: 'Order Details',
                        html: tableContent,
                        icon: 'info',
                        width: '70%',
                        button: 'OK'
                    });
                } catch (error) {
                    console.log(e.message);
                }
            })
        })
    } catch (e) {
        Swal.fire({
            title: 'Cart',
            text: 'Load cart to table failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}

document.getElementById('order-update').addEventListener('click',
    function (event) {
        event.preventDefault();
        updateOrder();
    })

async function updateOrder() {
    try {
        let formData = new FormData();
        formData.append('cartStatus', document.getElementById('order-status').value);
        let cartId = document.getElementById('order-id').value;
        await axios.put(`http://localhost:8080/api/v1/carts/${cartId}`, formData, {
            headers: {'Content-Type': 'application/json'}
        });
        Swal.fire.fire({
            title: 'Order',
            text: 'Update order successfully',
            icon: 'success',
            button: "OK"
        })
        resetFormOrder();
        getAllCartToTable();
    } catch (e) {
        Swal.fire({
            title: 'Order',
            text: 'Update order failed',
            icon: 'error',
            button: 'OK'
        })
    }
}

function resetFormOrder() {
    document.getElementById('order-id').value = null;
    document.getElementById('order-status').value = '';
}

document.getElementById('order-reset-form').addEventListener('click', resetFormOrder);