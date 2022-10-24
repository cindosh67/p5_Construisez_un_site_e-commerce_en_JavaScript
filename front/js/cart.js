//constante     tableau pour la boucle du formulaire
const contactBasket = [];
//Variable nouveau localStorage après validation formulaire
let commandeProduct = JSON.parse(localStorage.getItem
    ("commande"));


//Function qui sera appelé dans le catch error
function processError(err)  {
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
    console.error("erreur 404, sur ressource api: " + err);
}
//Function récupération localStorage et une condition si null
function retrievLocal(listProduct) {
    
    //récupération du local storage et verifier si il est vide
    const localBasket = JSON.parse(localStorage.getItem('basket'));
    // console.log(localBasket);
    const preparedBasket = prepareBasket(listProduct, localBasket);
    // console.log(preparedBasket);
    if (preparedBasket === null){
        document.querySelector("h1").innerHTML =
        "Vous n'avez pas d'article dans votre panier";
        return;
    }
    displayCart(preparedBasket)
    displayTotal(preparedBasket);
    listenQuantity(listProduct);
    listenDelet(listProduct);
    checkForm();
    listenOrder(preparedBasket);
}

// Function qui prepare le panier 
function prepareBasket(listProduct, basketStorage) {
    // console.log(basketStorage);
    
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
//function Récupération du localStorage => boucle avec itération => condition sur l'id et la couleur du produit si égal on ajuste la quantité
function setCartItemQuantity(quantity, productId, productColor) {
    
    const localBasket = JSON.parse(localStorage.getItem('basket'));
    for (let index = 0; index < localBasket.length; index++) {
        const item = localBasket[index];
        if (item.colors === productColor && item.id === productId) {
            localBasket[index].quantity = quantity;
            break;
        };
    };
    //Enregistrement du localStorage 
    localStorage.setItem('basket', JSON.stringify(localBasket));
    // console.log(localBasket);
    return (localBasket);
};
//Function écoute changement des boutons de quantité
function listenQuantity(listProduct) {

    //Création constante pour les boutons quantité
    const listInput = document.getElementsByClassName('itemQuantity');
    //Une boucle for avec écoute sur le changement
    //Récupération de la value de target en entier
    //Methode closest () pour renvoyer l'ancêtre le plus proche 
    for (let input of listInput) {
        input.addEventListener('change', (event) => {
            const target = event.target;
            const quantity = parseInt(target.value);
            const dataset = target.closest('article').dataset;
            //Variable qui est = à la fonction modifier de la qua quantité
            const newLocalBasket = setCartItemQuantity(quantity, dataset.id, dataset.color);
            //Nouveau Localstorage
            const newPreparedBasket = prepareBasket(listProduct, newLocalBasket);
            displayTotal(newPreparedBasket);
            console.log(newPreparedBasket);
        });
    };    
};

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
//Ecoute du bouton supprimer
function listenDelet(listProduct) {
    
    //Création variable suppréssion
    const deleteItems = document.getElementsByClassName('deleteItem');
    //Une boucle for avec écoute sur le bouton
    //Récupération de la value de target en entier
    //Methode closest () pour renvoyer l'ancêtre le plus proche 
    for (let deleteItem of deleteItems) {
        deleteItem.addEventListener('click', (event) => {
            const target = event.target;
            console.log(target);
            const articleElement = target.closest('article');
            console.log(articleElement);
            const sectionElement = target.closest('section');
            console.log(sectionElement);
            const dataset = articleElement.dataset;
            console.log(dataset);
            // variable qui est = à la fonction suppréssion
            const newLocalBasket = removeCartItem(dataset.id, dataset.color);
            
            // variable avec nouveau LocalStorage
            const newPreparedBasket = prepareBasket(listProduct, newLocalBasket);
            console.log(newPreparedBasket);
            sectionElement.removeChild(articleElement);
            //Fonction avec en parametre le nouveau LocalStorage
            displayTotal(newPreparedBasket);
            if (newPreparedBasket === null){
                document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
            }
        });
    };
};
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

/* LE FORMULAIRE */


    //Création  de constante pour récupérer les inputs du DOM et les stocker
    const submit        = document.querySelector("#order");

    const firstName     = document.querySelector("#firstName");
    const lastName      = document.querySelector("#lastName");
    const address       = document.querySelector("#address");
    const city          = document.querySelector("#city");
    const email         = document.querySelector("#email");
    
    let valueFirstName, valueLastName, valueEmail, valueCity, valueAddress;

function checkForm() {

//Ecoute des l'input avec des conditions et des regex pour respecter certains caractères

    firstName.addEventListener("input" , (event) => {

        if(event.target.value.length === 0){
            //error vide car l'utilisateur n'a encore rien complété
            firstNameErrorMsg.innerHTML = " ";
            valueFirstName = null;
        }else if(event.target.value.length < 2 || event.target.value.length > 25){
            firstNameErrorMsg.innerHTML = "Votre saisie est trop courte ou trop longue"
            valueFirstName = null;
        }
        //Regex des lettres  et entre 3 et 25 caractères 
        if (event.target.value.match(/^[a-z A-Z -]{1,25}$/)){
            firstNameErrorMsg.innerHTML = ""
            // La valeur que l'utilisateur à rentrer est = l'élement ciblé
            valueFirstName = event.target.value; 
            
        };
        //Si il est différent au reste alors la value reste null
        if (!event.target.value.match(/^[a-z A-Z -]{1,25}$/) &&
            event.target.value.length > 1 &&
            event.target.value.length < 25){
                firstNameErrorMsg.innerHTML = "Prénom ne doit pas contenir de caractères spécial, ni de chiffres..";
                valueFirstName = null;
            };
    });

    lastName.addEventListener("input" , (event) => {
        
        if(event.target.value.length === 0){
            lastNameErrorMsg.innerHTML = " ";
            valueLastName = null;
        }else if(event.target.value.length < 2 || event.target.value.length > 25){
            lastNameErrorMsg.innerHTML = "Votre saisie est trop courte ou trop longue"
            valueLastName = null;
        };
        if (event.target.value.match(/^[a-z A-Z]{1,25}$/)){
            lastNameErrorMsg.innerHTML = ""
            valueLastName = event.target.value;

        };
        if (!event.target.value.match(/^[a-z A-Z]{1,25}$/) &&
            event.target.value.length > 1 &&
            event.target.value.length < 25){
                lastNameErrorMsg.innerHTML = "Nom ne doit pas contenir de caractères spécial ni de chiffres..";
                valueLastName = null;
            };
    });
    address.addEventListener("input" ,  (event) => {
        
        if(event.target.value.length === 0){
            addressErrorMsg.innerHTML = " ";
            valueAddress = null;
        }else if(event.target.value.length < 3 || event.target.value.length > 35){
            addressErrorMsg.innerHTML = "Votre saisie est trop courte ou trop longue"
            valueAddress = null;
        };
        if (event.target.value.match(/^[0-9]{1,4}[ a-z A-Z ,]{3,35}$/)){
            addressErrorMsg.innerHTML = ""
            valueAddress = event.target.value;

        };
        if (!event.target.value.match(/^[0-9]{1,4}[ a-z A-Z ,]{3,35}$/) &&
            event.target.value.length > 3 &&
            event.target.value.length < 25){
                addressErrorMsg.innerHTML = "Addresse ne doit pas contenir de caractères spécial..";
                valueAddress = null;
            };
    });
    city.addEventListener("input" , (event) => {
        
        if(event.target.value.length === 0){
            cityErrorMsg.innerHTML = " ";
            valueCity = null;
        }else if(event.target.value.length < 2 || event.target.value.length > 25){
            cityErrorMsg.innerHTML = "Votre saisie est trop courte ou trop longue"
            valueCity = null;
        };
        if (event.target.value.match(/^[a-z A-Z]{2,25}$/)){
            cityErrorMsg.innerHTML = ""
            valueCity = event.target.value;
            
        };
        if (!event.target.value.match(/^[a-z A-Z]{2,25}$/) &&
            event.target.value.length > 2 &&
            event.target.value.length < 25){
                cityErrorMsg.innerHTML = "La ville ne doit pas contenir de caractères spécial..";
                valueCity = null;
            };
    });
    email.addEventListener("input" , (event) =>  {
        
        if(event.target.value.length === 0){
            emailErrorMsg.innerHTML = " ";
            valueEmail = null;
        }else if ( event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/)){
            emailErrorMsg.innerHTML = ""
            valueEmail = event.target.value;
            
        }
        if(!event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/) && !event.target.value.length == 0){
            emailErrorMsg.innerHTML = " Email incorrect ex : Paul@gmail.com ";
            valueEmail = null;
        };
    });
    
}
function listenOrder(preparedBasket) {
    
    submit.addEventListener("click", (event) => { 
        event.preventDefault();
    
        //Vérification du formulaire + création aray  contactBasket pour y mettre contact en string
        if  ( valueFirstName && valueLastName && valueAddress && valueCity && valueEmail ){
            //Boucle forEach pour récupérer l'ID produit
            preparedBasket.forEach((commande => {
                contactBasket.push(commande.id);
                console.log("l'id produit panier" + contactBasket);
            }));
            
            const contact = {
                contact: {
                    firstName   : valueFirstName,
                    lastName    : valueLastName,
                    address     : valueAddress,
                    city        : valueCity,
                    email       : valueEmail,
                },
                products : contactBasket
            };
            console.log( contact);

            // REQUETE FETCH pour poster "voir route backend"

            fetch("http://localhost:3000/api/products/order", {
                
                method  : "POST",
                headers :  {"Content-Type": "application/json"},
                body    : JSON.stringify(contact), //transformer chaîne
            })
            .then((response) => response.json())
            .then((promise) => {
                //On stock la promise
                let data = promise;
                // console.log(data);

                let dataCommande = {
                    contact : data.contact,
                    products : data.products
                }
                console.log(dataCommande);
                //Condition si localStorage null on crée un array vide 
                // et on push les données de dataCommande dans le nouveau localStorage puis on enregistre contact et produit
                if(commandeProduct === null){
                    commandeProduct = [];
                    commandeProduct.push(dataCommande);
                    localStorage.setItem("contact", JSON.stringify(commandeProduct));
                    
                    }// on pousse les nouveau produit et enregistrement localStorage  de contact et des produit après formulaire valide
                else if(commandeProduct != null){
                    commandeProduct.push(dataCommande);
                    localStorage.setItem("contact", JSON.stringify(commandeProduct));
                    console.log(dataCommande);
                }
                // supprimer le localStorage après validation
                //Redirection vers la page confirmation avec ID de commande
                localStorage.clear("preparedBasket")
                location.href = "confirmation.html?id=" + data.orderId;
                
                //Pour éviter d'envoyer la commande plusieur fois vider les valeurs
                firstName.value = "";
                lastName.value  = "";
                address.value   = "";
                city.value      = "";
                email.value     = "";

                valueFirstName  = null;
                valueLastName   = null;
                valueAddress    = null;
                valueCity       = null;
                valueEmail      = null;
            });
        }else{
        alert("Veuillez remplir le formulaire correctement")
        };
    });
}



    // Récupération des produits de l'api

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((listProduct) => {
            
            retrievLocal(listProduct)

        })
        .catch(processError);
    
    
