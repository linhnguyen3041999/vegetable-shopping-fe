document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-normal').addEventListener('click', updateInformationForm);
});

async function updateInformationForm() {
    let userId = null;
    let formData = {
        fullName: document.getElementById("user-full-name").value,
        email: document.getElementById("user-email").value,
        phoneNumber: document.getElementById("user-phone-number").value,
        male: document.getElementById("male").value,
        female: document.getElementById("female").value,
        dob: document.getElementById("user-day-of-birth").value,
        address: document.getElementById("user-address").value,


// // Lấy các phần tử từ HTML
//     const citi = document.getElementById("city");
//     const districts = document.getElementById("district");
//     const wards = document.getElementById("ward");
//
//     async function loadAddressData() {
//         try {
//             // Gọi API để lấy dữ liệu địa chỉ
//             let {data: addressData} = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
//
//             // Lưu trữ dữ liệu gốc
//             const originalData = addressData;
//             console.log(addressData);
//             // Render thành phố (cấp cao nhất)
//             renderCities(addressData);
//
//             // Gán sự kiện click cho thành phố
//             citis.addEventListener('change', function () {
//                 const selectedCityId = this.options[this.selectedIndex].dataset.id;
//                 const selectedCityData = originalData.find(item => item.Id === selectedCityId);
//
//                 // Reset các lựa chọn quận huyện và phường xã
//                 districts.innerHTML = '<option value="">Chọn quận huyện</option>';
//                 wards.innerHTML = '<option value="">Chọn phường xã</option>';
//
//                 // Render quận huyện
//                 renderDistricts(selectedCityData.Districts);
//             });
//
//             // Gán sự kiện click cho quận huyện
//             districts.addEventListener('change', function () {
//                 const selectedDistrictId = this.options[this.selectedIndex].dataset.id;
//                 const selectedCityId = citis.options[citis.selectedIndex].dataset.id;
//                 const selectedCityData = originalData.find(item => item.Id === selectedCityId);
//                 const selectedDistrictData = selectedCityData.Districts.find(item => item.Id === selectedDistrictId);
//
//                 // Reset các lựa chọn phường xã
//                 wards.innerHTML = '<option value="">Chọn phường xã</option>';
//
//                 // Render phường xã
//                 renderWards(selectedDistrictData.Wards);
//             });
//         } catch (error) {
//             console.error('Error fetching address data:', error);
//             // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
//         }
//     }
//
// // Hàm render danh sách thành phố
//     function renderCities(cities) {
//         cities.forEach(city => {
//
//             addOptionToSelect(citis, city.Name, city.Id);
//         });
//     }
//
// // Hàm render danh sách quận huyện
//     function renderDistricts(districts) {
//         districts.forEach(district => {
//             addOptionToSelect(districts, district.Name, district.Id);
//         });
//     }
//
// // Hàm render danh sách phường xã
//     function renderWards(wards) {
//         wards.forEach(ward => {
//             addOptionToSelect(wards, ward.Name, ward.Id);
//         });
//     }
//
// // Hàm tiện ích để thêm option vào select
//     function addOptionToSelect(selectElement, text, value) {
//         const option = document.createElement('option');
//         option.value = value;
//         option.text = text;
//         option.dataset.id = value; // Sử dụng dataset để lưu trữ ID
//         selectElement.add(option);
//     }
//
// // Gọi hàm khi trang được tải
//     loadAddressData();
    }
}
