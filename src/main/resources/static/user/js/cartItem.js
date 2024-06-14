async function getAmount(){
    try {
        let result = await axios.get('http://localhost:8080/api/v1/cart/sumprice');
        let sumPrice = parseFloat(result.data);
        const elements = document.querySelectorAll('.cart-sum-price-span');
        elements.forEach((element) => {
            element.textContent = sumPrice;
        });
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getCount(){
    try {
        let result = await axios.get('http://localhost:8080/api/v1/cart/countitem');
        let count = parseInt(result.data);
        const elements = document.querySelectorAll('.cart-count-item-span');
        elements.forEach((element) => {
            element.textContent = count;
        });
    }catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.getAmount();
window.getCount();