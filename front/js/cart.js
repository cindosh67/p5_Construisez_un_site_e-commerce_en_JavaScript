// Variable qui récupère les articles du panier dans le local storage
let basketStorage = JSON.parse(localStorage.getItem("basket"));

let products = [];

if (basketStorage === null){
    document.querySelector("h1").textContent = ("Votre panier est vide");
}

for (let product of basketStorage){
    console.log(product);
    document.querySelector("#cart__items").innerHTML +=
    `
    <article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
        <div class="cart__item__img">
            <img src="${product.image}" alt="${product.alt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.colors}</p>
                <p>${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>
    `
}