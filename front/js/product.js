let colorsChoice = document.querySelector('#colors'); //selectionner et stocker Id colors

let btn = document.getElementById("addToCart")//sélectionner et stocker pour réutiliser la variable plus tard

let quantity = document.querySelector("#quantity"); //sélectionner et stocker pour réutiliser la variable plus tard 

/*******************************  Recherche de l'url searchParams  ********************/

let urlProduct = new URLSearchParams (document.location.search);

let productId = urlProduct.get("id");

const urlDetail = `http://localhost:3000/api/products/${productId}`
const promiseFetch = fetch(urlDetail); //créer varible promesse de Fetch + url API 
//console.log(promiseFetch);


promiseFetch.then((data) => { //promise Fetch
  data.json().then((detailProduct) => { //demande de reponse en .json  

    //récupération des details grâce au donné et on affiche au bon endroit en selectionnant les Class et ID concerné

    document.title = detailProduct.name;
    document.querySelector("#title").textContent += detailProduct.name;
    document.querySelector(".item__img").innerHTML += `<img src=${detailProduct.imageUrl} alt=${detailProduct.altTxt}">`;
    document.querySelector("#price").textContent += detailProduct.price;
    document.querySelector("#description").textContent += detailProduct.description;

    //boucle pour avoir les couleurs + création de la balise option pour chacune des couleurs

    for (let i = 0; i < detailProduct.colors.length; i++) {
      let color = detailProduct.colors[i];
      let option = document.createElement("option");

      option.innerText = `${color}`;
      option.value = `${color}`;

      colorsChoice.appendChild(option);
    }

    /******************************* Le Local Storage  ********************/

    //Ecoute du bouton pour la selection du canapé et condition si les valeurs ne sont pas selectionnées

    let bouton = document.getElementById("addToCart");

    bouton.addEventListener("click", () => {

      // condition si aucune couleur ou quantitées choisi 

      if (colorsChoice.value === "") {
        alert("Veuillez sélectionner une couleur");
        return;
      }

      const quantityChoice = parseInt(quantity.value); //parsInt analyse la valeur de la chaîne et renvoi 1er eniter
      if (quantityChoice === 0) {
        alert("Veuillez sélectionner une quantitée");
      } else {
        alert("Votre article est bien ajouté au panier");
      }
  
      /*On vérifie le basketStorage (localStorage) de clé basket 
      si null on créer un tableau vide pour récuperer les données sinon on reforme l'objet à partir de la chaîne de caractère*/

      const basketStorage = localStorage.getItem("basket");
      

      let basket = null
      if (basketStorage === null) {
        basket = [];
      } else {
        basket = JSON.parse(basketStorage);
      }

      // Rechercher si il y a deja un article identique avec la meme couleur
      // Si on le trouve on stock sa position dans le tableau de la variable item
      // Si rien n'est trouvé alors item aura la valeur null

      let item = null;
      for (let i = 0; i < basket.length; i++) {
        let searchItem = basket[i];
        console.log(searchItem);
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

    })
  });
});
