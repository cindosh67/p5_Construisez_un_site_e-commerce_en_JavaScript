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
  console.log(quantity);

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
    console.log(detailProduct);
    
    //récupération des details grâce au donné et on affiche au bon endroit en selectionnant les Class et ID concerné

    document.title = detailProduct.name;
    document.querySelector("#title").textContent += detailProduct.name;
    document.querySelector(".item__img").innerHTML += `<img src=${detailProduct.imageUrl} alt=${detailProduct.altTxt}">`;
    document.querySelector("#price").textContent += detailProduct.price;
    document.querySelector("#description").textContent += detailProduct.description;

    
    
    //boucle pour avoir les couleurs + création de la balise option pour chacune des couleurs

    for ( let i = 0; i < detailProduct.colors.length; i++) {
      let color = detailProduct.colors[i];
      console.log(color);
      let option = document.createElement("option");
      console.log(option);

      option.innerText = `${color}`;
      option.value = `${color}`;
      
    colorsChoice.appendChild(option);
    }
    
    //addBasket(detailProduct); // on appel la fonction ici pour pouvoir recupérer les details produits
    
  });
  //Ecoute du bouton pour la selection du canapé et condition si les valeurs ne sont pas selectionnées
  btn.addEventListener("click", () => {
  

    if(colorsChoice.value == false){
      confirm("Veuillez sélectionner une couleur");
      console.log(colorsChoice);
    } else if (quantity.value == 0) {
      alert("Veuillez choisir une quantitée");
      console.log(quantity);
    }
    else {
      alert(" Votre article est bien ajouté au panier");
    }

  })

});

//********************** LE PANIER LOCALSTORAGE **********************/

  /*const addBasket = ()  => {
  
    
    
    bouton.addEventListener("click", () => {

      let productTab = JSON.parse(localStorage.getItem("data"));
      let selectCanap = document.querySelector("#colors");
      console.log(productTab, selectCanap);

      if (productTab == null) {
        productTab = [];
        productTab.push(detailProduct);
        console.log(productTab);
      }

    })
  }*/


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