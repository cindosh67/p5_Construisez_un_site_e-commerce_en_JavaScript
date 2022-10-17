const url = 'http://localhost:3000/api/products'

//créer varible promesse = Fetch + url API 

const promesseFetch = fetch(url);

//demande de reponse en .json 

promesseFetch.then((data) => {
  data.json().then((listProducts) => {

    //variable pour la construction HTML
    let htmlText = "";

    //boucle itératteur + variable produits (pour selectionner, stocker les produit )

    for (let i=0; i < listProducts.length; i++) {
      const products = listProducts[i];
      //console.log(products);

    //variable htmlText pour utiliser innerHTML sans trop faire travailler le DOM
    

      htmlText += `
        <a href="./product.html?id=${products._id}">
          <article>
            <img src=${products.imageUrl} alt=${products.altTxt}">
            <h3 class="productName">${products.name}</h3>
            <p class="productDescription">${products.description}</p>
          </article>
        </a>
      `
    console.log(htmlText)
    
    
    // créer variable affichage de l'ID items pour afficher les produit dans le DOM avec innerHTML
  

    const affichage = document.querySelector("#items");
    affichage.innerHTML = htmlText
    }
  });
})