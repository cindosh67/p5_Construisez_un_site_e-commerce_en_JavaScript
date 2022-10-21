const url = 'http://localhost:3000/api/products'

//créer varible promesse = Fetch + url API 

const promesseFetch = fetch(url);

//demande de reponse en .json 

promesseFetch.then((data) => {
  data.json().then((listProducts) => {
    
    //boucle itératteur + réponse de L'API (pour selectionner/stocker les produit )

    for (let i=0; i < listProducts.length; i++) {
      const products = listProducts[i];
      // console.log(products);

      document.querySelector("#items").innerHTML +=
      `
        <a href="./product.html?id=${products._id}">
          <article>
            <img src=${products.imageUrl} alt=${products.altTxt}">
            <h3 class="productName">${products.name}</h3>
            <p class="productDescription">${products.description}</p>
          </article>
        </a>
      `
    };
  });
})
.catch((err) => {

  document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404, sur ressource api: " + err);

});
