async function getAllCategoriesVerticalBlogDetail() {
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
    } catch (error) {
        console.error('Error fetching categories:', error);
        document.getElementById('blog-sidebar-item').innerHTML = '<p>Error fetching categories</p>';
    }
}
getAllCategoriesVerticalBlogDetail();

let currentUrl = window.location.href;

console.log(currentUrl); // In ra URL hiện tại trên console

sessionStorage.setItem('currentUrl', currentUrl);

async function fillBlogDetail(categoryId = null, blogTitle = null, pageNo = 1) {
    try {
        let sessionBlogDetailId = sessionStorage.getItem('currentUrl');
        let urls = new URL(sessionBlogDetailId);
        let blogId = urls.searchParams.get('blogId');
        console.log('Session: ' + sessionBlogDetailId);
        let url = `http://localhost:8080/api/v1/blogs?active=1&blogId=${blogId}`;
        let responses = await axios.get(url);
        console.log(responses);
        let blogDetails = responses.data;
        let result = `
        <h1>${blogDetails.blogs[0].blogTitle}</h1>
        `
        let result1 = `
        <p>${blogDetails.blogs[0].blogContent}</p>
        `
        let result2 = `
        <img src="https://drive.google.com/thumbnail?id=${blogDetails.blogs[0].blogImage}" alt="">
        `
        document.getElementById('blog__details__hero__text__title').innerHTML = result;
        document.getElementById('show-blog-details').innerHTML = result1;
        document.getElementById('show-image-details').innerHTML = result2;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        document.getElementById('blog__details__hero__text__title').innerHTML = '<p>Error fetching blogs</p>';
    }
}

// Gọi hàm fillBlogDetail để lấy chi tiết blog
fillBlogDetail();



