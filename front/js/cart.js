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
        
        // on récupère le panier
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
                    };
                };
               
            };
        
        display(basketStorage);
        totalQuantity(basketStorage)
        modifyQuantity();
        };
        
        
    };
    
    //Fonction d'affichage d'un panier (tableau)

    function display(prod) {
        // on déclare et on pointe la zone d'affichage
        let zonePanier = document.querySelector("#cart__items");
        // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
        zonePanier.innerHTML += prod.map((detailProduct) => 
        `<article class="cart__item" data-id="${detailProduct.id}" data-color="${detailProduct.colors}" data-quantité="${detailProduct.quantity}" data-prix="${detailProduct.price}">
                <div class="cart__item__img">
                  <img src="${detailProduct.image}" alt="${detailProduct.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${detailProduct.name}</h2>
                    <p>${detailProduct.colors}</p>
                    <p>${detailProduct.price} €</p>
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
        ).join("") ;
        
        ;
    };
    
    //Fonction quantity total et price total

    function totalQuantity(basketStorage) {  

        let editPrice = basketStorage.map((element) => element.price);

        let totalPrice = editPrice.reduce((previousValue, currentValue) => previousValue + currentValue);
        console.log(totalPrice);

        let editQuantity = basketStorage.map((element) => element.quantity);
        
        let totalQuantity =editQuantity.reduce((previousValue, currentValue) => previousValue + currentValue)
        console.log(totalQuantity);

        if(totalQuantity === 1 || totalQuantity === 0){
            document.querySelector(".cart__price p").innerHTML = ` <p>Total ( ${totalQuantity} article) : <span id="totalPrice"><${totalPrice}></span> €</p>`
        }else{
             document.querySelector(".cart__price p").innerHTML = ` <p>Total ( ${totalQuantity} articles) : <span id="totalPrice">${totalPrice}</span> €</p>`
        } ;



    };
    // //Fonction modif 

    function modifyQuantity() {
      const cart = document.querySelectorAll(".cart__item");
      /* comment regarde ce qu'onva afficher avec le data*/
      /* cart.forEach((cart) => {console.log("item panier en dataset: " + " " + cart.dataset.id + " " + cart.dataset.color + " " + cart.dataset.quantité); });*/
      // On écoute ce qu'il se passe dans itemQuantity de l'article concerné
      cart.forEach((cart) => {
        cart.addEventListener("change", (eq) => {
          console.log(cart.dataset.id);
          // vérification d'information de la valeur du clic et son positionnement dans les articles
          let basketStorage = JSON.parse(localStorage.getItem("basket"));
          // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
          for (article of basketStorage)
          console.log(article.quantity);
            if (
              article.id === cart.dataset.id &&
              cart.dataset.color === article.colors
            ) {
              article.quantity = eq.target.value;
              
              localStorage.basket = JSON.stringify(basketStorage);
              // on met à jour le dataset quantité
              cart.dataset.quantity = eq.target.value;
              // on joue la fonction pour actualiser les données
              totalQuantity(basketStorage);
              console.log(totalQuantity);
            }
        });
      });
    }
    function name(params) {
      
    }
});

