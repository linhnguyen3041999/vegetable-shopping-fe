async function getAllBlogs() {
    try {
        // Gọi API để lấy dữ liệu sản phẩm
        let {data: blogs} = await axios.get('http://localhost:8080/api/v1/blogs');
        // Biến để lưu trữ kết quả HTML
        let result = '';
        console.log(blogs);
        const categoryMap = {
            1: 'Vegetable',
            2: 'Fruit',
            3: 'Mono',
            4: 'Mene',
            5: 'Vegetable',
            6: 'Fruit',
            7: 'Mono',
            8: 'Mene',
            9: 'Vegetable',
            10: 'Fruit'
        }
        blogs.forEach(blog => {
            let blogStatus = blog.blogActive ? 'Original' : 'Draft';
            let blogCategoryName = categoryMap[blog.blogCategory.categoryId] || 'Unknown'; // Lấy tên danh mục từ categoryMap hoặc 'Unknown' nếu không tìm thấy
            result += `
                <tr class="table-blog">
                    <td>${blog.blogId}</td>
                     <td>${blog.blogCreate_by}</td>
                     <td>${blogCategoryName}</td>
                     <td class="fixed-width-title">${blog.blogTitle}</td>
                     <td class="fixed-width-content">${blog.blogContent}</td>
                     <td>${blog.blogImage}</td>
                     <td>${blogStatus}</td>
                     
                     <td><button class="btn btn-warning"><i class="fas fa-edit"></i></button></td>
                </tr>     
      `;
            lastBlogId = blog.blogId;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('table-blog-result').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('table-blog-result').innerHTML = '<p>Error fetching data</p>';
    }
}
// <img src="https://drive.google.com/thumbnail?id=${blog.blogImage}" alt="ImgProduct"/>
getAllBlogs();

async function resetFormNormal() {
    document.addEventListener('DOMContentLoaded', function () {
        const resetButton = document.getElementById('resetForm');
        resetButton.addEventListener('click', function () {
            // Reset input fields
            document.getElementById('titleBlog').value = '';
            document.querySelector('input[name="status"][value="active"]').checked = true;
            document.getElementById('mockupID').value = '';
            document.getElementById('contentBlog').value = '';
            document.getElementById('imagePreview').src = '#'; // Reset image preview
            // Optional: You can also reset any other elements or states here
        });
    });
}
resetFormNormal();

async function resetFromEditor(){
    document.addEventListener('DOMContentLoaded', function() {
        // Load CKEditor on textarea
        CKEDITOR.replace('contentBlog');
        const resetButton = document.getElementById('resetForm');
        resetButton.addEventListener('click', function() {
            // Reset CKEditor content
            CKEDITOR.instances['contentBlog'].setData('');

            // Optional: Reset other form elements if needed
            document.getElementById('imagePreview').src = '#'; // Reset image preview
        });
    });
}
resetFromEditor();

async function pageBreak(){
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.main-content > div').forEach(div => div.style.display = 'none');
            document.querySelector(this.getAttribute('href')).style.display = 'block';
        });
    });
    // Set default active link and content
    window.onload = function () {
        document.querySelector('.sidebar a[href="#dashboard"]').click();
    };
}
pageBreak();

async function showImageMockup(){
    document.getElementById('mockupID').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}
showImageMockup();


async function addBlog() {
    let formData = new FormData();
    formData.append('blogTitle', document.getElementById('titleBlog').value);
    formData.append('blogActive', document.querySelector('input[name="status"]:checked').value);
    formData.append('blogContent', document.getElementById('contentBlog').value);
    formData.append('file', document.getElementById('mockupID').files[0]);
    formData.append('blogCategory', document.getElementById('selectedBlog').value);

    try {
        let blogResponse = await axios.post('http://localhost:8080/api/v1/blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        await swal({
            title: 'Blog',
            text: 'Add blog successfully',
            icon: 'success',
            button: 'Oke'
        });
        await getAllBlogs();
        resetFromEditor();
    } catch (error) {
        console.error('Error:', error);
        await swal({
            title: 'Blog',
            text: 'Add blog failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}
// async function addBlog(){
//     await axios.post("http://localhost:8080/api/v1/blogs", {
//         blogTitle: document.getElementById('titleBlog'),
//         blogContent: document.getElementById('contentBlog'),
//         blogCategory: document.getElementById('selectedBlog'),
//         blogActive: document.getElementById('activeBlog'),
//         file: document.getElementById('mockupID').files[0]
//     }).then(()=> {alert("create blog success")})
// }
// function formDataThumbnail(imageElementId, productId) {
//     let formData = new FormData();
//     const file = document.getElementById(imageElementId).files[0];
//     if (file) {
//         formData.append('file', file);
//     }
//     formData.append('productId', productId);
//     return formData;
// }
//
// async function addProductPhoto(imageElementId, productId) {
//     let formData = formDataThumbnail(imageElementId, productId);
//     if (formData.get('file')) {
//         try {
//             const response = await axios.post('http://localhost:8080/api/v1/product-photos', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//         } catch (error) {
//         }
//     } else {
//     }
// }



