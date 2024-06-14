async function addCookie(){
    try {
        let {data: cartItems} = await axios.get('http://localhost:8080/api/v1/cart');
        const jsonString = JSON.stringify(cartItems);
        document.cookie = "mycart=" + jsonString + "; path=/";
    }catch (error){
        console.log("Error: " + error);
    }
}

async function getCookie(){
    try {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('mycart='));
        if (cookieValue) {
            const parsedList = JSON.parse(cookieValue.split('=')[1]);
            console.log(parsedList);
            return parsedList;
        }
    }catch (error){
        console.log("Error: " + error);
    }
}