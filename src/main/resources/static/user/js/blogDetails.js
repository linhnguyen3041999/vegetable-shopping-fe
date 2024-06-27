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
        let { data: blog } = await axios.get(`http://localhost:8080/api/v1/blogs/${blogId}`);
        console.log(blog);
        const formattedDate = formatDate(blog.blogDate);
        console.log(formattedDate);
        let result = `
        <h2>${blog.blogTitle}</h2>
        `
        let result1 = `
        <p>${blog.blogContent}</p>
        `
        let result2 = `
        <img src="${blog.blogImage}" alt="">
        `
        let result3 = `
        <ul>
           | ${formattedDate} |</li>
        </ul>
        `
        document.getElementById('blog__details__hero__text__title').innerHTML = result;
        document.getElementById('show-blog-details').innerHTML = result1;
        document.getElementById('show-image-details').innerHTML = result2;
        document.getElementById('blog__details__hero__text__time').innerHTML = result3;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        document.getElementById('blog__details__hero__text__title').innerHTML = '<p>Error fetching blogs</p>';
    }
}
// Gọi hàm fillBlogDetail để lấy chi tiết blog
fillBlogDetail();

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // Đảm bảo rằng tháng và ngày có hai chữ số bằng cách thêm '0' khi cần thiết
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
}



