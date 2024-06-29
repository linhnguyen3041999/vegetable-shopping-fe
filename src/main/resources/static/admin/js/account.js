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
                        title: 'Account',
                        text: 'Load account to form failed',
                        icon: 'warning',
                        button: 'Oke'
                    });
                }
            })
        });
    } catch (error) {
    }
}

async function saveAccount() {
    try {
        let formData = new FormData();
        formData.append('fullname', document.getElementById('full-name').value);
        formData.append('phoneNumber', document.getElementById('phone-number').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('dayOfBirth', document.getElementById('day-of-birth').value);
        formData.append('password', document.getElementById('password').value);
        formData.append('address', document.getElementById('user-address').value);
        formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
        await axios.post('http://localhost:8080/api/v1/users', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        Swal.fire({
            title: 'Account',
            text: 'Create account successfully',
            icon: 'success',
            button: 'Oke'
        });
    } catch (error) {
        console.log(error.message);
    }
}



