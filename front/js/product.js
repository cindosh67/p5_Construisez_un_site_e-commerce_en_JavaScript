//Second test Seul

/* (Une autre facon de récupérer l'URL)

//On localise url pour avoir url avec l'Id produit et on stock

const productId = window.location.search.split("?id=").join("");
console.log(productId);

const urlDetail = `http://localhost:3000/api/products/${productId}`;

*/
let colorsChoice = document.querySelector('#colors'); //selectionner et stocker Id colors
  //console.log(colorsChoice);

let btn = document.getElementById("addToCart")
  //console.log(btn);

let quantity = document.querySelector("#quantity"); //selectionnet et stocker pour réutiliser la variable plus tard
 // console.log(quantity);

const urlProduct = new URL (document.location); //variable pour stocker la nouvelle url
//console.log(urlProduct);

const productId = urlProduct.searchParams; //variable pour stocker le searchParams de l'url

const urlProductId = productId.get("id"); //variable pour stocker le paramètre get (id)
//console.log(urlProductId);

const urlDetail = `http://localhost:3000/api/products/${urlProductId}`;

const promiseFetch = fetch (urlDetail) ; //créer varible promesse de Fetch + url API 
//console.log(promiseFetch);


promiseFetch.then((data) => { //promise Fetch
  data.json().then((detailProduct) =>{ //demande de reponse en .json  
    //console.log(detailProduct);
  
    
    //récupération des details grâce au donné et on affiche au bon endroit en selectionnant les Class et ID concerné

    document.title = detailProduct.name;
    document.querySelector("#title").textContent += detailProduct.name;
    document.querySelector(".item__img").innerHTML += `<img src=${detailProduct.imageUrl} alt=${detailProduct.altTxt}">`;
    document.querySelector("#price").textContent += detailProduct.price;
    document.querySelector("#description").textContent += detailProduct.description;

    
    
    //boucle pour avoir les couleurs + création de la balise option pour chacune des couleurs

    for ( let i = 0; i < detailProduct.colors.length; i++) {
      let color = detailProduct.colors[i];
      let option = document.createElement("option");

      option.innerText = `${color}`;
      option.value = `${color}`;
      
    colorsChoice.appendChild(option);
    }

  //Ecoute du bouton pour la selection du canapé et condition si les valeurs ne sont pas selectionnées
  
    
    /******************************* Le Local Storage ********************/

    let bouton = document.getElementById("addToCart");

    bouton.addEventListener("click", () => {


      // let produitTab = JSON.parse(localStorage.getItem("basket"));
      // console.log(produitTab);
      //
      // if(colorsChoice.value == false){
      //   confirm("Veuillez sélectionner une couleur");
      // }
      // else if (quantity.value == 0) {
      //   confirm("Veuillez choisir une quantitée");
      // }
      // else {
      //   alert(" Votre article est bien ajouté au panier");
      // }
      //
      // const fusionProd = Object.assign({}, detailProduct, {
      //   colors : `${colorsChoice.value}`,
      //   quantity: `${quantity.value}`,
      // })
      //
      // console.log(fusionProd);
      //
      // if (produitTab == null){
      //   produitTab = [];
      //   produitTab.push(fusionProd);
      //   console.log(produitTab);
      //   localStorage.setItem("basket", JSON.stringify(produitTab));
      // }

      // Pas de couleur => erreur => quit
      if (colorsChoice.value === '') {
        alert("Veuillez sélectionner une couleur");
        return;
      }

      // ~Pas de quantité =>  erreur => quit
      const quantityInt = parseInt(quantity.value);
      if (quantityInt === 0) {
        alert("Veuillez choisir une quantitée");
        return;
      }

      // Vérification / récupération d'un panier eventuellement existant ou creation d'un nouveau panier
      const basketStr = localStorage.getItem('basket');
      let basket = null;
      if (basketStr === null) {
        basket = [];
      } else {
        basket = JSON.parse(basketStr);
      }

      // Rechercher dans le panier existant si il y a deja un article du meme produit avec la meme couleur
      // Si on le trouve on stock sa position dans le tableau dans la variable basketItemIndex
      // Si rien n'est trouvé alors basketItemIndex aura la valeur null
      let basketItemIndex = null;
      for (let i = 0; i < basket.length; i++) {
        let searchItem = basket[i];
        if (
          searchItem.color === colorsChoice.value
          && searchItem.id === urlProductId
        ) {
          basketItemIndex = i;
        }
      }
      // basketItemIndex = basket
      //   .findIndex((searchItem) => searchItem.color === colorsChoice.value && searchItem.id === urlProductId);

      debugger;
      // Ajout d'un nouvel articl dans le panier si il n'y en a pas deja un
      if (basketItemIndex === -1) {
        let newBasketItem = {
          color: colorsChoice.value,
          quantity: quantityInt,
          id: urlProductId,
        }
        basket.push(newBasketItem);

        // Modification de la quantité du produit si deja présent
      } else {
        basket[basketItemIndex].quantity += quantityInt;
      }

      // Enregistrement du panier modifié
      localStorage.setItem('basket', JSON.stringify(basket));
    })
  
  });
});

 /*test AVEC MATHIEU 

const monUrl = new URL(document.location);
console.log(monUrl);
const searchParams = monUrl.searchParams;

const productId = searchParams.get('id');
console.log(productId);


const endpoint = `http://localhost:3000/api/products/${productId}`;

const promesseFinFetch = fetch(endpoint);

promesseFinFetch.then((data) => {
  data.json().then((produit) => {
    document.querySelector
    console.log(produit);
  });
});*/