let orderId = new URLSearchParams(location.search).get("id")
console.log(orderId);


document.querySelector("#orderId").textContent = orderId;