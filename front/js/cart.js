
//Function qui sera appelé dans le catch error
function processError(err)  {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.error("erreur 404, sur ressource api: " + err);
}
// Function qui  prepare le panier en récupérant les données de l'API 
function prepareBasket(listProduct, basketStorage) {
    if (basketStorage === null || basketStorage.length < 1) {
        return (null);
    } else {
        // zone clef/valeur de l'api et du panier avec id produit choisit dans le localStorage
        for (var detailProduct of basketStorage) {
            
            for ( i = 0; i < listProduct.length; i++) {
                
                if (detailProduct.id === listProduct[i]._id) {
                    // création et ajout de valeurs à panier 
                    detailProduct.name = listProduct[i].name;
                    detailProduct.price = listProduct[i].price;
                    detailProduct.image = listProduct[i].imageUrl;
                    detailProduct.description = listProduct[i].description;
                    detailProduct.alt = listProduct[i].altTxt;
                };
            };
            
        };
        return (basketStorage);
    };
    
};

// Fonction d'affichage d'un panier 
function displayCart(preparedBasket) {
    // déclare et pointe la zone d'affichage
    let zoneBasket = document.querySelector("#cart__items");
    // créer les affichages des produits du panier via un map et introduction de dataset dans le code
    zoneBasket.innerHTML += preparedBasket.map((detailProduct) => 
    `<article class="cart__item" data-id="${detailProduct.id}" data-color="${detailProduct.colors}">
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
    ).join('');
};

//Function modif quantité avec parametre quantité, ID, COLEUR 
//Récupération du localStorage => boucle avec itération => condition sur l'id et la couleur du produit
function setCartItemQuantity(quantity, productId, productColor) {
    
    const localBasket = JSON.parse(localStorage.getItem('basket'));
    for (let index = 0; index < localBasket.length; index++) {
        const item = localBasket[index];
        if (item.colors === productColor && item.id === productId) {
            localBasket[index].quantity = quantity;
            break;
        }
    }
    //Enregistrement du localStorage 
    localStorage.setItem('basket', JSON.stringify(localBasket));
    return (localBasket);
}
//Function de suppréssion d'article
//Récupération du localStorage
function removeCartItem(productId, productColor) {
    const localBasket = JSON.parse(localStorage.getItem('basket'));
    //Création d'un nouveau panier pour les nouvelles données
    const newBasket = [];
    for (let index = 0; index < localBasket.length; index++) {
        const item = localBasket[index];
        if (item.colors === productColor && item.id === productId) {
            continue;
        }
        newBasket.push(item);
    }
    //On enregistre le nouveau panier dans le localStorage
    localStorage.setItem('basket', JSON.stringify(newBasket));
    return (newBasket);
}
//Function pour les quantitées total + prix total avec la methode reduce
function displayTotal(preparedBasket) {
    if (preparedBasket === null) {
        document.getElementById('totalPrice').innerText = 0;
        document.getElementById('totalQuantity').innerText = 0;
        return;
    }
    const totalPrice = preparedBasket.reduce((acc, elm) => {
        return (acc + (elm.quantity * elm.price));
    }, 0);
    document.getElementById('totalPrice').innerText = totalPrice;

    const nbrArticles = preparedBasket.reduce((acc, elm) => {
        return (acc + elm.quantity);
    }, 0);
    document.getElementById('totalQuantity').innerText = nbrArticles;
}



document.addEventListener("DOMContentLoaded", (event) => {

    // Récupération des produits de l'api

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((listProduct) => {
            //récupération du local storage et verifier si il est vide
            const localBasket = JSON.parse(localStorage.getItem('basket'));
            const preparedBasket = prepareBasket(listProduct, localBasket);
            if (preparedBasket === null){
                document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
                return;
            }
            displayCart(preparedBasket);

            //Création variable pour le bouton quantité
            const listInput = document.getElementsByClassName('itemQuantity');
            //Une boucle for avec écoute sur le changement
            //Récupération de la value de target en entier
            //Methode closest () pour renvoyer l'ancêtre le plus proche 
            for (let input of listInput) {
                input.addEventListener('change', (event) => {
                    const target = event.target;
                    const quantity = parseInt(target.value);
                    const dataset = target.closest('article').dataset;
                    //Variable qui est = à la fonction modifier quantité
                    const newLocalBasket = setCartItemQuantity(quantity, dataset.id, dataset.color);
                    //Nouveau Localstorage
                    const newPreparedBasket = prepareBasket(listProduct, newLocalBasket);
                    displayTotal(newPreparedBasket);
                });
            }

            //Création variable suppréssion
            const deleteItems = document.getElementsByClassName('deleteItem');
            //Une boucle for avec écoute sur le bouton
            //Récupération de la value de target en entier
            //Methode closest () pour renvoyer l'ancêtre le plus proche 
            for (let deleteItem of deleteItems) {
                deleteItem.addEventListener('click', (event) => {
                    const target = event.target;
                    const articleElement = target.closest('article');
                    const sectionElement = target.closest('section');
                    const dataset = articleElement.dataset;
                    // variable qui est = à la fonction suppréssion
                    const newLocalBasket = removeCartItem(dataset.id, dataset.color);
                    // variable avec nouveau LocalStorage
                    const newPreparedBasket = prepareBasket(listProduct, newLocalBasket);
                    sectionElement.removeChild(articleElement);
                    //Fonction avec en parametre le nouveau LocalStorage
                    displayTotal(newPreparedBasket);
                    if (newPreparedBasket === null){
                        document.querySelector("h1").innerHTML =
                        "Vous n'avez pas d'article dans votre panier";
                    }
                });
            }
            displayTotal(preparedBasket);
        })
        .catch(processError);

});

