
let perPage = 6;
let currentPage = 1;
let start = 0;
let end = perPage;
let currentCategoryId = null;

const btnNext = document.getElementById('btnNext');
const btnPre = document.getElementById('btnPre');

async function loadProducts(categoryId, page) {
    try {
        let response = await axios.get(`http://localhost:8080/api/v1/product/${categoryId}`);
        let products = response.data;
        let productResult = '';

        start = (page - 1) * perPage;
        end = page * perPage;

        products.slice(start, end).forEach(product => {
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
                            <h6><a href="#">${product.name}</a></h6>
                            <h5>$${product.price}</h5>
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById('product-row').innerHTML = productResult;
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    }
}

async function getAllCategories() {
    try {
        let response = await axios.get('http://localhost:8080/api/v1/category');
        let categories = response.data;
        let result = '';

        categories.forEach(category => {
            result += `<li><a class="mx-2" href="#" id="category-id-${category.categoryId}">${category.categoryName}</a></li>`;
        });

        document.getElementById('category-shop-grid-menu').innerHTML = result;

        let menuItems = document.querySelectorAll('#category-shop-grid-menu li');
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
                currentPage = 1;
                await loadProducts(categoryId, currentPage);
            });
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        alert('Error loading categories');
    }
}

btnNext.addEventListener('click', async () => {
    currentPage++;
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    console.log(start, end);
    await loadProducts(currentCategoryId, currentPage);
});
btnPre.addEventListener('click', async () => {
    currentPage--;
    if(currentPage <= 1) {
        currentPage = 1;
    }
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    console.log(start, end);
    await loadProducts(currentCategoryId, currentPage);
});

getAllCategories();

