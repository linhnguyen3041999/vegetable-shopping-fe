window.getAllUser();

async function getAllUser(page = 0, size = 10) {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/users?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let users = response.content;
        let result = '';
        users.forEach(item => {
            let genderDisplay = item.gender ? 'Male' : 'Female';
            let activeDisplay = item.active ? 'Active' : 'InActive';
            result += `
                        <tr class="odd">
                            <td class="align-middle">${item.userId}</td>
                            <td class="align-middle">${item.username}</td>
                            <td class="align-middle">${item.fullname}</td>
                            <td class="align-middle">${item.email}</td>
                            <td class="align-middle">${item.phoneNumber}</td>
                            <td class="align-middle">${genderDisplay}</td>
                            <td class="align-middle">${activeDisplay}</td>
                            <td class="align-middle" id="tooltip-container2">
                                <a id="account-table-edit-${item.userId}" class="me-3 text-primary mx-1" data-bs-toggle="modal" data-bs-target="#categoryModal"><i class="fa-solid fa-pencil"></i></a>
                            </td>
                        </tr>
                       `;
        })
        document.getElementById('account-table').innerHTML = result;

        let accountPage = '';
        for (let i = 0; i < response.totalPages; i++) {
            accountPage += `
                <li class="page-item ${i === response.number ? 'active' : ''}">
                    <a class="page-link" onclick="getAllUser(${i}, ${size})">${i + 1}</a>
                </li>
            `;
        }

        document.getElementById('account-pageable').innerHTML = `
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                    ${accountPage}
                </ul>
            </nav>
        `;

        users.forEach(item => {
            // edit category
            let categoryEdit = document.getElementById(`category-table-edit-${category.categoryId}`);
            categoryEdit.addEventListener('click', async () => {
                try {
                    let {data: response} = await axios.get(`http://localhost:8080/api/v1/categories/${category.categoryId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    document.getElementById('category-id').value = response.categoryId;
                    document.getElementById('category-name').value = response.categoryName;

                } catch (error) {
                    Swal.fire({
                        title: 'Category',
                        text: 'Load category to form failed',
                        icon: 'warning',
                        button: 'Oke'
                    });
                }
            })
        });
    } catch (error) {
        Swal.fire({
            title: 'Category',
            text: 'Uploading data to table failed',
            icon: 'error',
            button: 'Oke'
        });
    }
}