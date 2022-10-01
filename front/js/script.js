//Variable recup pour l'API

const url = 'http://localhost:3000/api/products'

//console.log(url)


//inserer les produits dans la page d'accueil.
fetch(url).then((response) =>
    response.json().then((data) => {
        console.log(data)
        for ( products of data){
          //console.log(products);
          document.getElementById ('items').innerHTML += `<a href="./product.html?id=${products._id}">
          <article>
            <img src="${products.imageUrl}" 
            alt="${products.altText}">
            <h3 class="productName">${products.name}</h3>
            <p class="productDescription">${products.description}</p>
          </article>
        </a>`
        }
    })  
)
 