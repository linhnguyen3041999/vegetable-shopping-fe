async function getAllBlogs() {
    try {
        // Gọi API để lấy dữ liệu sản phẩm
        let {data: blogs} = await axios.get('http://localhost:8080/api/v1/blogs');
        console.log(blogs); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        blogs.forEach(blog => {
            result += `
        <td>${blog.getId}</td>
                                    <td>${blog.getCreate_by}</td>
                                    <td>${blog.blogCategory}</td>
                                    <td class="fixed-width-title">${blog.blogTitle}</td>
                                    <td class="fixed-width-content">${blog.blogContent}</td>
                                    <td>${blog.}</td>
                                    <td>Yes</td>
                                    <td>
                                        <button class="btn btn-warning"><i class="fas fa-edit"></i></button>
                                    </td>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('table-blog').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('table-blog').innerHTML = '<p>Error fetching data</p>';
    }
}
window.getAllBlogs()