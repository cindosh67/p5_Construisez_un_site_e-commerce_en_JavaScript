// pour différancier la page confirmation et panier
document.addEventListener("DOMContentLoaded", (event) => {

// Récupération des produits de l'api

// appel de la ressource api product 

    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((listProduct) => {

        // appel de la fonction affichagePanier
        displayBasket(listProduct);
    })
    .catch((err) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + err);
    });
    

    function displayBasket(listProduct) {
        
        // on récupère le panier converti
         let basketStorage = JSON.parse(localStorage.getItem("basket"));
       // si il y a un panier null ou panier < 1
        if (basketStorage === null || basketStorage.length <= 1){
            // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
            document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
        }else{
        // zone clef/valeur de l'api et du panier avec id produit choisit dans le localStorage
       
            for (var detailProduct of basketStorage) {
               
                for ( i = 0; i < listProduct.length; i++) {
                   
                    if (detailProduct.id === listProduct[i]._id) {
                        // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
                        detailProduct.name = listProduct[i].name;
                        detailProduct.price = listProduct[i].price;
                        detailProduct.image = listProduct[i].imageUrl;
                        detailProduct.description = listProduct[i].description;
                        detailProduct.alt = listProduct[i].altTxt;
                    }
                }
                document.querySelector(".cart__price p").innerHTML = "Total ( articles) : €"
            }
        
        display(basketStorage);
        totalQuantity(basketStorage);
        };
    }
    
    //Fonction d'affichage d'un panier (tableau)

    function display(prod) {
        // on déclare et on pointe la zone d'affichage
        let zonePanier = document.querySelector("#cart__items");
        // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
        zonePanier.innerHTML += prod.map((detailProduct) => 
        `<article class="cart__item" data-id="${detailProduct._id}" data-color="${detailProduct.color}">
                <div class="cart__item__img">
                  <img src="${detailProduct.image}" alt="${detailProduct.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${detailProduct.name}</h2>
                    <p>${detailProduct.colors}</p>
                    <p>${detailProduct.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${detailProduct.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        ) 
        //on remplace les virgules de jonctions des objets du tableau par un vide
        
    }
    
    //Fonction quantity total et price total

    function totalQuantity(basketStorage) {
        
        let editPrice = basketStorage.map((element) => element.price);

        let totalPrice = editPrice.reduce((previousValue, currentValue) => previousValue + currentValue);
        console.log(totalPrice);
        let editQuantity = basketStorage.map((element) => element.quantity);
        
        let totalQuantity =editQuantity.reduce((previousValue, currentValue) => previousValue + currentValue)
        console.log(totalQuantity);

        if(totalQuantity <= 1){
            document.querySelector(".cart__price").innerHTML = ` <p>Total ( ${totalQuantity} article) : <span id="totalPrice"><${totalPrice}></span> €</p>`
        }else{
             document.querySelector(".cart__price").innerHTML = ` <p>Total ( ${totalQuantity} articles) : <span id="totalPrice">${totalPrice}</span> €</p>`
        } 
    }
});

