// //Variable recup pour l'API 1er TEst seule
//
// const url = 'http://localhost:3000/api/products'
//
// const promesseFinFetch = fetch(url);
//
//
// promesseFinFetch.then(async (retourDonee) => {
//
//   retourDonee.json().then((listProduits) => {
//
//
//       for ( products of data) {
//         document.getElementById('items').innerHTML += `<a href="./product.html?id=${products._id}">
//         <article>
//           <img src="${products.imageUrl}"
//           alt="${products.altText}">
//           <h3 class="productName">${products.name}</h3>
//           <p class="productDescription">${products.description}</p>
//         </article>
//       </a>`
//       }
//
//
//
//   });
// });
//

/* Test AVEC MATHIEU

Variable recup pour l'API

const url = 'http://localhost:3000/api/products'

const promesseFinFetch = fetch(url);


promesseFinFetch.then(async (retourDonee) => {

  retourDonee.json().then((listProduits) => {

    let htmlText = '';
    for (let i = 0; i < listProduits.length; i++) {
      const produit = listProduits[i];

      htmlText += `
        <a href="./product.html?id=${produit._id}">
          <article>
            <img src="${produit.imageUrl}"
            alt="${produit.altTxt}">
            <h3 class="productName">${produit.name}</h3>
            <p class="productDescription">${produit.description}</p>
          </article>
        </a>
        `;
    }

    const itemsDomElement = document.getElementById('items');
    itemsDomElement.innerHTML = htmlText;
  });
});

*/

//Variable recup pour l'API TROISIEME TEST REPRISE SEULE

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