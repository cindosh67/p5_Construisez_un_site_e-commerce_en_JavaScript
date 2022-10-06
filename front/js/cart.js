// recupérer la clé basket
let pageBasket = JSON.parse(localStorage.getItem("basket"));


let product = [];

if(pageBasket === null) {
    console.log(pageBasket);
    document.querySelector("h1").textContent += "est vide"
}console.log(pageBasket);

