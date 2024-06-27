let currentCategoryId = null;

async function loadProducts(categoryId, page = 0, size = 6) {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/products/category/${categoryId}?page=${page}&size=${size}`, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log('Products:', response);
        let productResult = '';
        let products = response.content;
        products.forEach(product => {
            productResult += `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" style="background-image: url(${product.photo})">
                            <ul class="product__item__pic__hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">${product.productName}</a></h6>
                            <h5>$${product.price}</h5>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('product-row').innerHTML = productResult;

        let pageNumbers = '';
        for (let i = 0; i < response.totalPages; i++) {
            pageNumbers += `
                <li class="page-item ${i === response.number ? 'active' : ''}">
                    <a class="page-link" onclick="loadProducts('${categoryId}', ${i}, ${size})">${i + 1}</a>
                </li>
            `;
        }

        document.getElementById('page_number').innerHTML = `
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                    ${pageNumbers}
                </ul>
            </nav>
        `;
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    }
}

async function getAllCategories() {
    try {
        let response = await axios.get('http://localhost:8080/api/v1/categories');
        let categories = response.data;
        console.log('Categories:', categories); // Kiểm tra dữ liệu nhận được từ API

        let result = '';

        categories.forEach(category => {
            result += `<li><a class="mx-2" href="#" id="category-id-${category.categoryId}">${category.categoryName}</a></li>`;
        });

        console.log('Result HTML:', result); // Kiểm tra HTML được tạo ra

        document.getElementById('category-shop-grid-menu').innerHTML = result;

        let menuItems = document.querySelectorAll('#category-shop-grid-menu li a'); // Lấy thẻ a thay vì thẻ li
        console.log('Menu Items:', menuItems); // Kiểm tra các item được tạo ra

        let currentActiveItem = null;

        menuItems.forEach(item => {
            item.addEventListener('click', async (event) => {
                event.preventDefault();

                if (currentActiveItem) {
                    currentActiveItem.classList.remove('active');
                }

                const clickedItem = event.target.parentElement;
                clickedItem.classList.add('active');
                currentActiveItem = clickedItem;

                const categoryId = event.target.id.split('-')[2];
                currentCategoryId = categoryId;
                currentPage = 0; // Đặt lại trang hiện tại về 0
                await loadProducts(categoryId, currentPage);
            });
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        alert('Error loading categories');
    }
}
getAllCategories();
let pageNumbers = '';
for (let i = 0; i < response.totalPages; i++) {
    pageNumbers += `
        <li class="page-item ${i === response.number ? 'active' : ''}">
            <a class="page-link" onclick="loadProducts('${categoryId}', ${i}, ${size})">${i + 1}</a>
        </li>
    `;
}

document.getElementById('page_number').innerHTML = `
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
            ${pageNumbers}
        </ul>
    </nav>
`;
