// Gọi hàm khi trang được tải
window.getAllProduct();
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
                                    <a class="d-block h5 mb-2 product-name" href="/product/product-detail">${product.productName}</a>
                                    <span class="me-1 product-price">${product.price * 0.9}</span>
                                    <s class="text-body text-decoration-line-through">${product.price}</s>
                                </div>
                                <div class="d-flex border-top  font-weight-bold">
                                    <small class="w-50 text-center border-end py-2">
                                        <a class="text-body" href="/product/product-detail"><i
                                                class="fa fa-eye text-primary me-2"></i>View detail</a>
                                    </small>
                                    <small class="w-50 text-center py-2">
                                        <a class="text-body" href="/product/product-detail"><i
                                                class="fa fa-shopping-bag text-primary me-2"></i>Add to cart</a>
                                    </small>
                                </div>
                            </div>
                        </div>
                      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('product-list').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('product-list').innerHTML = '<p>Error fetching data</p>';
    }
}

// getListCategory
async function getAllCategoriesVertical(){
    try {
        // Gọi API để lấy dữ liệu the loai
        let {data: categories} = await axios.get('http://localhost:8080/api/v1/categories');
        console.log(categories); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        categories.forEach(category => {
            result +=`
        <div class="col-lg-3">
                    <div class="categories__item set-bg">
                        <img src="https://drive.google.com/thumbnail?id=${category.categoryImage}">
                        <h5><a href="#">${category.categoryName}</a></h5>
                    </div>
                </div>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('categories__slider owl-carousel').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('categories__slider owl-carousel').innerHTML = '<p>Error fetching data</p>';
    }
}

async function getAllCategoriesHorizontal(){
    try {
        // Gọi API để lấy dữ liệu the loai
        let {data: categories} = await axios.get('http://localhost:8080/api/v1/categories');
        console.log(categories); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        categories.forEach(category => {
            result +=`
        <li><a href="#">${category.categoryName}</a></li>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('category-list').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('category-list').innerHTML = '<p>Error fetching data</p>';
    }
}

// Gọi hàm khi trang được tải
getAllProduct();
window.getAllCategoriesVertical();

window.getAllCategoriesHorizontal();
