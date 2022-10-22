//Sélectionner les éléments et les stocker pour les réutiliser plus tard

let colorsChoice = document.querySelector('#colors'); 

let btn = document.getElementById("addToCart");

let quantity = document.querySelector("#quantity");

/*******************************  Recherche de l'url searchParams  ********************/

let urlProduct = new URLSearchParams (document.location.search);

let productId = urlProduct.get("id");
// console.log(productId);

const urlDetail = `http://localhost:3000/api/products/${productId}`
const promiseFetch = fetch(urlDetail); //créer varible promesse de Fetch + url API 
// console.log(urlDetail);

//promise Fetch
//demande de reponse en .json 
promiseFetch.then((data) => { 
  data.json().then((listProducts) => {  

    option(listProducts);

  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api: " + err);
  });
});

  function option(listProducts) {
    
    //récupération des details grâce au donné et on affiche au bon endroit en selectionnant les Class et ID concerné

    document.title = listProducts.name;
    document.querySelector("#title").textContent += listProducts.name;
    document.querySelector(".item__img").innerHTML += `<img src=${listProducts.imageUrl} alt=${listProducts.altTxt}">`;
    document.querySelector("#price").textContent += listProducts.price;
    document.querySelector("#description").textContent += listProducts.description;

    //boucle pour rechercher les couleurs 
    //on pointe et on stock option dans une variable 

    for (let i = 0; i < listProducts.colors.length; i++) {
      let color = listProducts.colors[i];
      let option = document.createElement("option");
      // console.log(option);
      option.innerText = `${color}`;
      option.value = `${color}`;

      colorsChoice.appendChild(option);

    }
        btnEcoute( colorsChoice);

  };

    
function btnEcoute(colorsChoice) {
  //Ecoute du bouton pour la selection du canapé et condition si les valeurs ne sont pas selectionnées

  let bouton = document.getElementById("addToCart");

  bouton.addEventListener("click", () => {

    // condition si aucune couleur ou quantitées choisi 

    if (colorsChoice.value === "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    //Variable avec parsInt pour analyse de la valeur en chaîne et renvoi 1er eniter
    const quantityChoice = parseInt(quantity.value); 
    
    if (quantityChoice < 1 || quantityChoice > 100 ) {
      alert("Veuillez sélectionner une quantitée entre 1 et 100 s'il vous plaît");
    } else {
      alert("Votre article est bien ajouté au panier");
    }
    basket(quantityChoice); 
  });
  // console.log(bouton);
};
     /******************************* Le Local Storage  ********************/

function basket(quantityChoice) {
   /*On vérifie le basketStorage (localStorage) de clé basket 
      si null on créer un tableau vide pour récuperer les données sinon on reforme l'objet à partir de la chaîne de caractère*/

      const basketStorage = localStorage.getItem("basket");
      
      let basket = null
      if (basketStorage === null) {
        basket = [];
      } else {
        basket = JSON.parse(basketStorage);
      }
      // console.log(basket);

      // Rechercher si il y a deja un article identique avec la meme couleur
      // Si on le trouve on stock sa position dans le tableau de la variable item
      // Si rien n'est trouvé alors item aura la valeur null

      let item = null;
      for (let i = 0; i < basket.length; i++) {
        let searchItem = basket[i];
        if (
          searchItem.colors === colorsChoice.value
          && searchItem.id === productId
        ) {
          item = i
        }
      };
      // ajout d'un nouvel article dans le panier si il n'y est pas

      if (item === null) {
        let newItem = {
          id : productId,
          colors: colorsChoice.value,
          quantity: quantityChoice
        }
        basket.push(newItem); //on push le newItem dans basket
      } else {
        basket[item].quantity += quantityChoice //sinon on ajuste la quantité
      };
      //Enregistrement en transformant l'objet en chaîne de caractère

      localStorage.setItem('basket', JSON.stringify(basket));
}