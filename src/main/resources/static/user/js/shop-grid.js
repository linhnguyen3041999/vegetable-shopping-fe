let currentCategoryId = 1;
let size = 6;

async function loadProducts(categoryId ='', page = 0, sort = 'asc') {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/products/category?id=${categoryId}&page=${page}&size=${size}&sort=${sort}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let products = response.content;
        $('#product-row').empty();
        products.forEach(product => {
            $('#product-row').append(`
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" style="background-image: url(${product.photo})">
                            <ul class="product__item__pic__hover">
                                <li><a id="add-to-cart-${product.productId}"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">${product.productName}</a></h6>
                            <h5>$${product.price}</h5>
                        </div>
                    </div>
                </div>
            `)

        });

        $('.product__pagination').empty();
        for (let i = 0; i < response.totalPages; i++) {
            if (page === i) {
                $('.product__pagination').append(`
                    <a class="active" onclick="loadProducts('${categoryId}', ${i})">${i}</a>
                `)
            } else {
                $('.product__pagination').append(`
                    <a onclick="loadProducts('${categoryId}', ${i})">${i}</a>
                `)
            }

        }

        // Set total products
        $('.productQuantity').text(response.totalElements);

        //Sort Event
        $('.productSorting').off('change').on('change', function () {
            loadProducts(categoryId, page, this.value);
        });

        // Add to cart event
        let addToCart = document.getElementById(
            `add-to-cart-${product.productId}`);
        addToCart.addEventListener('click', async () => {
            const newItem = {
                product: product,
                quantity: 1,
                price: product.price
            }
            if (itemList !== null) {
                const index = itemList.findIndex(
                    item => item.product.productId === newItem.product.productId);
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
            swal.fire("Added to cart!");
        });
    } catch (error) {
        console.error('Error loading products:', error);
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
    }
}

async function loadCategoryToGrid() {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/categories`);
        let categories = response.content;
        let result = '';
        categories.forEach(category => {
            result += `
                 <li><a id="category-gird-${category.categoryId}" href="#">${category.categoryName}</a></li>
            `;
        })
        document.getElementById('category-shop-grid-menu').innerHTML = result;

        categories.forEach(category => {
            // let categoryId = document.getElementById(`category-gird-${category.categoryId}`).value;
            document.getElementById(`category-gird-${category.categoryId}`).addEventListener('click',
                async function ()  {
                let categoryId = category.categoryId;
                    console.log(categoryId)
                loadProducts(categoryId, page = 0);
            })
        })
    } catch (error) {
        logger.error(error.message);
    }
}

window.loadCategoryToGrid();
window.loadProducts();