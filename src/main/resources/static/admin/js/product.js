// Load data up table
getAllProductAdmin();

async function getAllProductAdmin() {
    try {
        let {data: products} = await axios.get('http://localhost:8080/api/v1/product');
        let result = '';
        products.forEach(product => {
            result += `
                        <tr>
                            <td>${product.productId}</td>
                            <td>${product.productName}</td>
                            <td><img src="/user/template/img/product/${product.photo}" alt="ImgProduct" width="50"></td>
                            <td>${product.quantity}</td>
                            <td>${product.price}</td>
                            <td>${product.weight}</td>
                            <td>${product.categoryId}</td>
                            <td>
                                <button id="product-table-edit-${product.productId}" class="btn btn-warning">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button id="product-table-delete-${product.productId}" class="btn btn-danger"">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
        });
        document.getElementById('product-table').innerHTML = result;

        products.forEach(product => {
            // Delete
            let productDelete = document.getElementById(`product-table-delete-${product.productId}`);
            productDelete.addEventListener('click', async () => {
                try {
                    await axios.delete(`http://localhost:8080/api/v1/product/${product.productId}`);
                    alert('Delete Product Success');
                    getAllProductAdmin();
                } catch (error) {
                    console.error('Error:', error);
                    alert('Delete Product Failed');
                }
            });
            // Edit
            let productEdit = document.getElementById(`product-table-edit-${product.productId}`);
            productEdit.addEventListener('click', async () => {
                try {
                    let {data: response} = await axios.get(`http://localhost:8080/api/v1/product/${product.productId}`)
                    console.log(response)
                    document.getElementById('product-id').value = response.productId;
                    document.getElementById('product-name').value = response.productName;
                    document.getElementById('product-quantity').value = response.quantity;
                    document.getElementById('product-price').value = response.price;
                    document.getElementById('product-weight').value = response.weight;
                    document.getElementById('product-description').value = response.description;
                    document.getElementById('product-category-id').value = response.categoryId;
                    // document.getElementById('product-photo').value = response.photo;
                } catch (error) {
                    console.error('Error:', error);
                    alert('edit not found');
                }
            })

        });

    } catch (error) {
        console.error('Error: ', error);
    }
}

// Add Product
document.getElementById('add-product').addEventListener('click',
    function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        addProduct();
    })
function addProduct() {
    let photoInput = document.getElementById('product-photo');
    let product = {
        productName: document.getElementById('product-name').value,
        quantity: +document.getElementById('product-quantity').value,
        price: +document.getElementById('product-price').value,
        weight: +document.getElementById('product-weight').value,
        photo: photoInput.files.length > 0 ? photoInput.files[0].name : '',
        description: document.getElementById('product-description').value,
        categoryId: +document.getElementById('product-category-id').value
    }
    axios.post('http://localhost:8080/api/v1/product', product)
        .then(response => {
            alert('Add product successfully');
            getAllProductAdmin();
        })
        .catch(error => {
            alert('Add product failed: ' + error.message);
        });
}

document.getElementById('update-product').addEventListener('click',
    function (event) {
        event.preventDefault();
        updateProduct();
    })

async function updateProduct() {
    try {
        let photoInput = document.getElementById('product-photo');
        let product = {
            productId: +document.getElementById('product-id').value,
            productName: document.getElementById('product-name').value,
            quantity: +document.getElementById('product-quantity').value,
            price: +document.getElementById('product-price').value,
            weight: +document.getElementById('product-weight').value,
            photo: photoInput.files.length > 0 ? photoInput.files[0].name : '',
            description: document.getElementById('product-description').value,
            categoryId: +document.getElementById('product-category-id').value
        }
        await axios.put(`http://localhost:8080/api/product/${product.productId}`, product);
        alert('Update Product Success');
        getAllProductAdmin();
    } catch (error) {
        alert('Update Product Failure');
        console.log('Error: ' + error.message);
    }
}

document.getElementById('delete-product').addEventListener('click',
    function (event) {
        event.preventDefault();
        deleteProduct();
    })

async function deleteProduct() {
   try {
       let productId = +document.getElementById('product-id').value;
       await axios.delete(`http://localhost:8080/product/${productId}`)
       alert('Product deleted successfully')
   } catch (error) {
       alert('Delete failed');
       console.log('Error: ' + error.message);
   }
}







