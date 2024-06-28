/**
 * call api load products to index
 * @returns {Promise<void>}
 */
async function getAllProduct() {
    try {
        // Gọi API để lấy dữ liệu sản phẩm
        let {data: products} = await axios.get('http://localhost:8080/api/v1/products');
        console.log(products); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        products.forEach(product => {
            result += `
        <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="product-item border my-3">
                <div class="position-relative bg-light overflow-hidden">
                    <img class="img-fluid w-100 product-image" src="https://drive.google.com/thumbnail?id=${product.photo}" alt="ImgProduct">
                    <div
                            class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                    </div>
                </div>
                <div class="text-center p-4">
                    <a class="d-block h5 mb-2 product-name" href="/product/product-detail">${product.productName}</a>
                    <span class="mr-1 product-price">$${product.price * 0.9}</span>
                    <s class="text-body text-decoration-line-through">$${product.price}</s>
                </div>
                <div class="d-flex border-top  font-weight-bold">
                    <small class="w-50 text-center border-right py-2">
                        <a class="text-body" href="/product/product-detail"><i
                                class="fa fa-eye mr-2"></i><span>View detail</span></a>
                    </small>
                    <small class="w-50 text-center py-2">
                        <button id="add-to-cart-${product.productId}" class="text-body border-0"><i
                                class="fa fa-shopping-bag mr-2"></i><span>Add to cart</span></button>
                    </small>
                </div>
            </div>
        </div>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('product-list').innerHTML = result;
        let itemList = [];
        if(localStorage.getItem("items")){
            itemList = JSON.parse(localStorage.getItem("items"));
        }
        products.forEach(product => {
            // Add
            let addToCart = document.getElementById(`add-to-cart-${product.productId}`);
            addToCart.addEventListener('click', async () => {
                const newItem = {
                    product: product,
                    quantity: 1,
                    price: product.price
                }
                if(itemList !== null){
                    const index = itemList.findIndex(item => item.product.productId === newItem.product.productId);
                    if (index !== -1) {
                        const quantityChange = itemList[index].quantity + 1;
                        itemList[index].quantity = quantityChange;
                        itemList[index].price = itemList[index].quantity * newItem.price;
                    } else {
                        itemList.push(newItem);
                    }
                }
                localStorage.setItem("items", JSON.stringify(itemList));
                getAmount();
                getCount();
                swal("Added to cart!");
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('product-list').innerHTML = '<p>Error fetching data</p>';
    }
}

// getListCategory
async function getAllCategoriesVertical(){
    try {
        // Gọi API để lấy dữ liệu the loai
        let responses= await axios.get('http://localhost:8080/api/v1/categories');
        let categories = responses.data.content;
        // Biến để lưu trữ kết quả HTML
        let result = '';
        if (!Array.isArray(categories)) {
            throw new Error('Categories is not an array');
        }
        categories.forEach(category => {
            result +=`
        <div class="col-lg-3">
                    <div class="categories__item set-bg">
                        <img src="${category.categoryImage}">
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
        let response = await axios.get('http://localhost:8080/api/v1/categories');
        let categories = response.data.content;
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
window.getAllProduct();
window.getAllCategoriesVertical();

window.getAllCategoriesHorizontal();
window.getAmount();
window.getCount();
