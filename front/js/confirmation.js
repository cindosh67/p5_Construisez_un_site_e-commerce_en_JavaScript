// Recherche de l'order id avec searchParams pour pouvoir afficher le numéro de commande.

let orderId = new URLSearchParams(location.search).get("id")
console.log(orderId);
document.querySelector("#orderId").textContent = orderId;