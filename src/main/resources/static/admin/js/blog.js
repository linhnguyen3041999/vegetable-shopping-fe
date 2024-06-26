document.addEventListener('DOMContentLoaded', function () {
    CKEDITOR.replace('contentBlog');
    getAllBlogs();
    showImageMockup();
    pageBreak();
    resetFormNormal();
    getAllCategory();
    document.getElementById('resetForm').addEventListener('click', resetFormNormal);
    document.getElementById('add-blog-editor').addEventListener('click', addOrUpdateBlog);
});

let currentBlogId = null;
let currentCategoryId = null;
async function getAllCategory(){
    let {data: categories} = await axios.get('http://localhost:8080/api/v1/categories');
    let result = '';
    categories.forEach(category => {
        result += `
                <option value=${category.categoryId} >${category.categoryName}</option>
            `;
    });
    document.getElementById('selectedBlog').innerHTML = result;
}
async function getAllBlogs() {
    try {
        let {data: blogs} = await axios.get('http://localhost:8080/api/v1/blogs');
        let result = '';
        blogs.forEach(blog => {
            let blogStatus = blog.blogActive ? 'Original' : 'Draft';
            result += `
                <tr class="table-blog" data-blog-id="${blog.blogId}">
                    <td>${blog.blogId}</td>
                    <td>${blog.blogCategory.categoryId}</td>
                    <td class="fixed-width-title">${blog.blogTitle}</td>
                    <td class="fixed-width-content">...</td>
                    <td class="mockup-cell"><img src="https://drive.google.com/thumbnail?id=${blog.blogImage}"></td>
                    <td>${blogStatus}</td>
                    <td><button class="btn btn-warning edit-button" data-blog-id="${blog.blogId}"><i class="fas fa-edit"></i></button></td>
                </tr>     
            `;
        });
        document.getElementById('table-blog-result').innerHTML = result;

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const blogId = this.getAttribute('data-blog-id');
                fillFormWithBlogData(blogId);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('table-blog-result').innerHTML = '<p>Error fetching data</p>';
    }
}

async function fillFormWithBlogData(blogId) {
    currentBlogId = blogId;
    try {
        let {data: blog} = await axios.get(`http://localhost:8080/api/v1/blogs/${blogId}`);
        document.getElementById('titleBlog').value = blog.blogTitle;
        document.getElementById('contentBlog').value = blog.blogContent;
        CKEDITOR.instances['contentBlog'].setData(blog.blogContent);
        document.querySelector(`input[name="status"][value="${blog.blogActive ? 1 : 0}"]`).checked = true;
        document.getElementById('selectedBlog').value = blog.blogCategory.categoryId;
        console.log(blog.blogImage);
        if (blog.blogImage) {
            document.getElementById('imagePreview').src = `https://drive.google.com/thumbnail?id=${blog.blogImage}`;
            hinhAnh = document.getElementById('imagePreview').src = `https://drive.google.com/thumbnail?id=${blog.blogImage}`;
            console.log(hinhAnh)
        } else {
            document.getElementById('imagePreview').src = '#';
        }
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }
}

async function resetFormNormal() {
    let {data: categories} = await axios.get('http://localhost:8080/api/v1/categories');
    currentCategoryId = categories[0].categoryId;
    console.log(currentCategoryId);
    var titleBlog = document.getElementById('titleBlog').value = '';
    document.querySelector('input[name="status"][value="1"]').checked = true;
    document.getElementById('mockupID').value = '';
    document.getElementById('contentBlog').value = '';
    CKEDITOR.instances['contentBlog'].setData('');
    document.getElementById('imagePreview').src = '';
    currentBlogId = null;
    document.getElementById('selectedBlog').value = currentCategoryId;
}

function pageBreak() {
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.main-content > div').forEach(div => div.style.display = 'none');
            document.querySelector(this.getAttribute('href')).style.display = 'block';
        });
    });
    window.onload = function () {
        document.querySelector('.sidebar a[href="#dashboard"]').click();
    };
}

function showImageMockup() {
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

async function addOrUpdateBlog() {
    let formData = new FormData();
    formData.append('blogTitle', document.getElementById('titleBlog').value);
    formData.append('blogActive', document.querySelector('input[name="status"]:checked').value);
    formData.append('blogContent', CKEDITOR.instances['contentBlog'].getData());
    formData.append('file', document.getElementById('mockupID').files[0]);
    formData.append('categoryId', document.getElementById('selectedBlog').value);
    try {
        if (currentBlogId) {
            await axios.put(`http://localhost:8080/api/v1/blogs/${currentBlogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Blog updated successfully',
                timer: 2000,
                showConfirmButton: false
            });
            await getAllBlogs();
            await resetFormNormal();
        } else {
            await axios.post('http://localhost:8080/api/v1/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Blog added successfully',
                timer: 2000,
                showConfirmButton: false
            });
            await getAllBlogs();
            await resetFormNormal();
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


