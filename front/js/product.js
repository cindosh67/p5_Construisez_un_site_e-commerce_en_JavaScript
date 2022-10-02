//Second test Seul

//On localise url pour avoir url avec l'Id produit et on stock
const productId = window.location.search.split("?id=").join("");
console.log(productId);

const urlProduct = `http://localhost:3000/api/products/${productId}`;
//créer varible promesse = Fetch + url API 

const promiseFetch = fetch(urlProduct);
console.log(promiseFetch);

//demande de reponse en .json  

promiseFetch.then((data) => {
  data.json().then((detailProduct) =>{
    console.log(detailProduct);
    
    //récupération des details avec les Class et ID pour les afficher

    document.title = detailProduct.name;
    document.querySelector("#title").textContent += detailProduct.name;
    document.querySelector(".item__img").innerHTML += `<img src=${detailProduct.imageUrl} alt=${detailProduct.altTxt}">`;
    document.querySelector("#price").textContent += detailProduct.price;
    document.querySelector("#description").textContent += detailProduct.description;

    //let colorsChoice = document.querySelector('#colors');
    //console.log(colorsChoice);

    document.querySelector('#colors');
    console.log("#colors");

  })
})
/* test AVEC MATHIEU 

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
});


*/
