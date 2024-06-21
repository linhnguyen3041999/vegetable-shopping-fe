window.getYearToComboBoxReport();

async function getYearToComboBoxReport() {

}

// count users
window.countUsers();

async function countUsers() {
    try {
        let {data: countUsers} = await axios.get('http://localhost:8080/api/v1/users/countUsers');
        document.getElementById('count-users').innerText = countUsers;
    } catch (e) {
        console.log(e.message())
    }
}

// count products

window.countProducts();

async function countProducts() {
    try {
        let {data: countProducts} = await axios.get('http://localhost:8080/api/v1/products/countProducts');
        document.getElementById('count-products').innerText = countProducts;
    } catch (e) {
        console.log(e.message);
    }
}

//count order
window.countOrderInWeek();

async function countOrderInWeek() {
    try {
        let {data: countOrderInWeek} = await axios.get('http://localhost:8080/api/v1/carts/countOrderInWeek');
        document.getElementById('count-order-in-7day').innerText = countOrderInWeek;
    } catch (e) {
        console.log(e.message);
    }
}

// chart js
window.chartJs = chartJs;
async function chartJs() {
    try {
        let {data: yearReport} = await axios.get('http://localhost:8080/api/v1/carts/findYearOrder');
        console.log(yearReport);
        let result = '';
        yearReport.forEach(year => {
            result += `
                <option value="${year}">${year}</option>
            `;
        });
        document.getElementById('report-year').innerHTML = result;
        if (yearReport.length > 0) {
            updateChart(yearReport[0]);
        }
    } catch (error) {
        console.error('Error fetching year data:', error);
    }
    document.getElementById('report-year').addEventListener('change', (event) => {
        const year = event.target.value;
        updateChart(year);
    });
}

async function updateChart(year) {
    try {
        let reportRevenueByMonth = document.getElementById('report-revenue-by-month').getContext('2d');
        let {data: reportMonth} = await axios.get(`http://localhost:8080/api/v1/reports/reportRevenueByMonth/${year}`);
        const labels = reportMonth.map(item => `M ${item.month}`);
        const data = reportMonth.map(item => item.revenue);

        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(reportRevenueByMonth, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: data,
                    backgroundColor: 'rgb(154,2,2)',
                    borderWidth: 1,
                    maxBarThickness: 50
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    chartJs();
});



// top product
window.getTopProducts();

async function getTopProducts() {
    let {data: product} = await axios.get('http://localhost:8080/api/v1/reports/reportTopProducts');
    let count = 0;
    let result = '';
    product.forEach(product => {
        result += `
                <tr>
                    <td>${count += 1}</td>
                    <td>${product.productName}</td>
                    <td>${product.totalSold}</td>
                </tr>
        `
    })
    document.getElementById('top-products').innerHTML = result;
}


