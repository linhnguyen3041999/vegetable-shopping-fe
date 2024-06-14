/**
 * call api load products to index
 * @returns {Promise<void>}
 */
async function getAllProduct() {
    try {
        // Gọi API để lấy dữ liệu sản phẩm
        let {data: products} = await axios.get('http://localhost:8080/api/v1/product');
        console.log(products); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        products.forEach(product => {
            result += `
        <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="product-item border my-3">
                <div class="position-relative bg-light overflow-hidden">
                    <img class="img-fluid w-100 product-image"
                         src="/user/template/img/product/${product.photo}" alt="Product Image">
                    <div
                            class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                    </div>
                </div>
                <div class="text-center p-4">
                    <a class="d-block h5 mb-2 product-name" href="/product/product-detail">${product.name}</a>
                    <span class="me-1 product-price">${product.price * 0.9}</span>
                    <s class="text-body text-decoration-line-through">${product.price}</s>
                </div>
                <div class="d-flex border-top  font-weight-bold">
                    <small class="w-50 text-center border-end py-2">
                        <a class="text-body" href="/product/product-detail"><i
                                class="fa fa-eye text-primary mr-2"></i><span>View detail</span></a>
                    </small>
                    <small class="w-50 text-center py-2">
                        <button id="add-to-cart-${product.productId}" style="background-color: white" class="text-body border-0" href=""><i
                                class="fa fa-shopping-bag text-primary mr-2"></i><span>Add to cart</span></button>
                    </small>
                </div>
            </div>
        </div>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('product-list').innerHTML = result;

        products.forEach(product => {
            // Add
            let addToCart = document.getElementById(`add-to-cart-${product.productId}`);
            addToCart.addEventListener('click', async () => {
                try {
                    await axios.post(`http://localhost:8080/api/v1/cart/${product.productId}`);
                    alert('Added this product to cart');
                    getAmount();
                    getCount();
                    addCookie();
                } catch (error) {
                    console.error('Error:', error);
                    alert('Add product to cart failed');
                }
            });

        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('product-list').innerHTML = '<p>Error fetching data</p>';
    }
}


// Gọi hàm khi trang được tải
window.getAllProduct();
window.getAllItem();