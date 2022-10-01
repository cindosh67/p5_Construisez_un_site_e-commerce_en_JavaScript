// //Variable recup pour l'API
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

//Variable recup pour l'API

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

