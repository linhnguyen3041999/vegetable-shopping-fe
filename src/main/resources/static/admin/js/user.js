async function getAlluser() {
    try {
        // Gọi API để lấy dữ liệu the loai
        let {data : users} = await axios.get('http://localhost:8080/api/v1/users');
        console.log(users); // Kiểm tra dữ liệu trong console
        // Biến để lưu trữ kết quả HTML
        let result = '';
        users.forEach(user => {
            result += `
        <tr>
            <td>${user.userId}</td>
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.dateOfBirth}</td>
            <td>${user.address}</td>
            <td>${user.gender}</td>
        </tr>
      `;
        });
        // Hiển thị kết quả lên trang HTML
        document.getElementById('account-table-body').innerHTML = result;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('account-table-body').innerHTML = '<p>Error fetching data</p>';
    }
}
window.getAlluser();
