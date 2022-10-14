document.addEventListener("DOMContentLoaded", (event) => {

    // Variable qui récupère les articles du panier dans le local storage
    let basketStorage = JSON.parse(localStorage.getItem("basket"));
    console.log(basketStorage);

    //si le Local est vide afficher panier vide
    if (basketStorage === null || basketStorage.length ===0) {
        document.querySelector("h1").textContent = ("Votre panier est vide");
    }else{
        const url = 'http://localhost:3000/api/products';

        fetch(url).then((data) =>
        data.json().then((listProducts) => {
            for (product of listProducts){
                let sectionCartItem = document.querySelector("#cart__items");
                console.log(sectionCartItem);
                for (let i = 0; i < basketStorage.length; i++) {
                    var item = basketStorage[i]
                    displayCart();
                    if (product.colors === item.colors && product.id === item.id){
                        
                    }
                };
            };
            

            function displayCart() {
                document.querySelector("#cart__items").innerHTML +=
                `
                <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
                    <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
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
            };

        }));
    };
});
    

// var item = null;
//                 for (let i = 0; i < basketStorage.length; i++) {
//                     var productLocal = basketStorage[i];
//                     console.log(productLocal);
//                     if (
//                         productLocal.colors === listProducts.colors
//                         && productLocal.id === listProducts.id
//                       ) {
//                         item = i
//                       }
                    
//                     displayCart();
//                     //console.log(displayCart);
//                 }
            

        
//             products.push(listProducts.id);