let currentCategoryId = null;
let searchTitle = null;
const blogsPerPage = 4;
let blogId = null;
let blogsData = [];
async function getAllCategoriesVertical() {
    try {
        const { data: categories } = await axios.get('http://localhost:8080/api/v1/categories');
        let result = '';
        categories.forEach(category => {
            result += `
                <li>
                    <a href="#" data-category-id="${category.categoryId}">${category.categoryName}</a>
                </li>
            `;
        });
        document.getElementById('blog-sidebar-item').innerHTML = result;
        document.querySelectorAll('#blog-sidebar-item a').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const categoryId = parseInt(this.getAttribute('data-category-id'));
                if (currentCategoryId === categoryId) {
                    currentCategoryId = null;
                    this.classList.remove('active');
                    getBlogs();
                } else {
                    currentCategoryId = categoryId;
                    document.querySelectorAll('#blog-sidebar-item a').forEach(a => a.classList.remove('active'));
                    this.classList.add('active');
                    getBlogs(categoryId, searchTitle);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        document.getElementById('blog-sidebar-item').innerHTML = '<p>Error fetching categories</p>';
    }
}

async function getBlogs(categoryId = null, blogTitle = null, pageNo = 1) {
    try {
        let url = `http://localhost:8080/api/v1/blogs?pageNo=${pageNo}&pageSize=${blogsPerPage}&active=1`;
        if (categoryId) url += `&categoryId=${categoryId}`;
        if (blogTitle) url += `&blogTitle=${blogTitle}`;
        const { data: response } = await axios.get(url);
        let blogs = response.blogs;
        let totalPages = response.totalPages;

        let result = '';
        blogs.forEach(blog => {
            result += `
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="blog__item">
                        <div class="blog__item__pic">
                            <img src="https://drive.google.com/thumbnail?id=${blog.blogImage}" alt="">
                        </div>
                        <div class="blog__item__text">
                            <h5><a href="#">${blog.blogTitle}</a></h5>
                            <p class="truncate">${blog.blogContent}</p>
                            <a href="#" class="blog__btn" data-blog-id="${blog.blogId}">READ MORE <span class="arrow_right" style="display: none">${blog.blogId}</span></a>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('row-blog').innerHTML = result;
        renderPagination(totalPages, pageNo);

        // Thêm sự kiện cho các nút "READ MORE" sau khi cập nhật HTML
        document.querySelectorAll('.blog__btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                blogId = this.getAttribute('data-blog-id');
                sessionStorage.setItem('blogDetailId',blogId);
                console.log("ID blog la: " + blogId);
                let linkURL = window.location.href = `/vegetable-shopping/blog-details?blogId=${blogId}`;
                console.log(linkURL);
            });
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        document.getElementById('row-blog').innerHTML = '<p>Error fetching blogs</p>';
    }
}

// Render pagination buttons
function renderPagination(totalPages, currentPage) {
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<a href="#" class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    }
    document.getElementById('pagination').innerHTML = paginationHTML;
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const pageNo = parseInt(this.getAttribute('data-page'));
            getBlogs(currentCategoryId, searchTitle, pageNo);
            document.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Fetch all blogs on page load
document.getElementById('search-input').addEventListener('input', function(event) {
    searchTitle = this.value.trim();
    getBlogs(currentCategoryId, searchTitle);
});

// Initialize categories and blogs on page load
getAllCategoriesVertical();
getBlogs();





