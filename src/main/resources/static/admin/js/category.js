window.getAllCategories();

async function getAllCategories() {
    try {
        let {data: categories} = await axios.get('http://localhost:8080/api/v1/categories');
        let result = '';
        categories.forEach(category => {
            result += `
                        <tr>
                            <td>${category.categoryId}</td>
                            <td>${category.categoryName}</td>
                            <td><img src="https://drive.google.com/thumbnail?id=${category.categoryImage}"></td>
                            <td>
                                <button id="category-table-edit-${category.categoryId}" class="btn btn-warning">
                                <i class="fas fa-edit"></i></button>
                                <button id="category-table-delete-${category.categoryId}" class="btn btn-danger">
                                <i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                       `;
        })
        document.getElementById('category-table').innerHTML = result;

        categories.forEach(category => {
            //delete category
            let categoryDelete = document.getElementById(`category-table-delete-${category.categoryId}`);
            categoryDelete.addEventListener('click', async () => {
                try {
                    await axios.delete(`http://localhost:8080/api/v1/categories/${category.categoryId}`);
                    swal({
                        title: 'Delete Category',
                        text: 'Delete successfully',
                        icon: 'success',
                        button: 'Oke'
                    });
                    getAllCategories();
                } catch (error) {
                    swal({
                        title: 'Category',
                        text: 'Delete category failed',
                        icon: 'warning',
                        button: 'Oke'
                    });
                }
            });
            // edit category
            let categoryEdit = document.getElementById(`category-table-edit-${category.categoryId}`);
            categoryEdit.addEventListener('click', async () => {
                try {
                    let {data: response} = await axios.get(`http://localhost:8080/api/v1/categories/${category.categoryId}`);
                    document.getElementById('category-id').value = response.categoryId;
                    document.getElementById('category-name').value = response.categoryName;
                    document.getElementById('category-image-show').style.display = 'block'
                    document.getElementById('category-label-image').style.display = 'none'
                    document.getElementById('category-image-show').src = `https://drive.google.com/thumbnail?id=${category.categoryImage}`
                } catch (error) {
                    swal({
                        title: 'Category',
                        text: 'Load category to form failed',
                        icon: 'warning',
                        button: 'Oke'
                    });
                }
            })
        });
    } catch (error) {
        swal({
            title: 'Category',
            text: 'Uploading data to table failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}

document.getElementById('reset-category').addEventListener('click', () => {
    resetFormCategory();
})

function resetFormCategory() {
    document.getElementById('category-id').value = null;
    document.getElementById('category-name').value = null;
    document.getElementById('category-image').value = null;
    document.getElementById('category-label-image').style.display = 'block';
    document.getElementById('category-image-show').style.display = 'none';
    document.getElementById('category-image-show').src = null;
}

document.getElementById('add-category').addEventListener('click',
    function (event) {
        event.preventDefault();
        addCategory();
    })

async function addCategory() {
    try {
        let formData = new FormData();
        formData.append('categoryName', document.getElementById('category-name').value);
        formData.append('file', document.getElementById('category-image').files[0]);

        await axios.post('http://localhost:8080/api/v1/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        swal({
            title: 'Category',
            text: 'Add category successfully',
            icon: 'success',
            button: 'Oke'
        });
        resetFormCategory();
        getAllCategories();
    } catch (error) {
        swal({
            title: 'Category',
            text: 'Add category failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('category-image');
    const imagePreview = document.getElementById('category-image-show');
    const labelPreview = document.getElementById('category-label-image');

    imageInput.addEventListener('change', function (event) {
        const input = event.target;
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                labelPreview.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
});

document.getElementById('delete-category').addEventListener('click',
    function (event) {
        event.preventDefault();
        deleteCategory();
    })

async function deleteCategory() {
    try {
        let categoryId = document.getElementById('category-id').value;
        await axios.delete(`http://localhost:8080/api/v1/categories/${categoryId}`)
        swal({
            title: 'Category',
            text: 'Delete category successfully',
            icon: 'success',
            button: 'Oke'
        });
        resetFormCategory();
        getAllCategories();
    } catch (error) {
        swal({
            title: 'Category',
            text: 'Delete category failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}

document.getElementById('update-category').addEventListener('click',
    function (event) {
        event.preventDefault();
        updateCategory();
    })

async function updateCategory() {
    try {
        let formData = new FormData();
        formData.append('categoryId', document.getElementById('category-id').value);
        formData.append('categoryName', document.getElementById('category-name').value);
        let fileInput = document.getElementById('category-image');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }
        let categoryId = document.getElementById('category-id').value;
        await axios.put(`http://localhost:8080/api/v1/categories/${categoryId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        swal({
            title: 'Category',
            text: 'Update category successfully',
            icon: 'success',
            button: 'Oke'
        });
        resetFormCategory();
        getAllCategories();
    } catch (error) {
        swal({
            title: 'Category',
            text: 'Update category failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}
