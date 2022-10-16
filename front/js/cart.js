document.addEventListener("DOMContentLoaded", (event) => {

    
    // Variable qui récupère les articles du panier dans le local storage
    let basketStorage = JSON.parse(localStorage.getItem("basket"));
    //console.log(basketStorage);

    //addPrice();
    //addQuantFunction();
let basket = [];


    //si le Local est vide afficher panier vide
    if (basketStorage === null || basketStorage.length ===0) {
        document.querySelector("h1").textContent = ("Votre panier est vide");
    }
        for (let product of basketStorage){
            //console.log(product);

            let productId = product.id;

                fetch('http://localhost:3000/api/products/'+ productId)
                .then((data) =>data.json().then((listProducts) => {
                    var detailProduct = listProducts;
                    //console.log(detailProduct);
                

                    // if(product.colors === detailProduct.colors && product.id  === detailProduct._id){
                    //     basket.push(detailProduct);
                    //     localStorage.setItem("basket", JSON.stringify(basketStorage))
                        
                    // }
                    // console.log(basket);
                    
                    displayCart(detailProduct);
                    
        }));

        function displayCart(detailProduct) {
            document.querySelector("#cart__items").innerHTML +=
            `
            <article class="cart__item" data-id="${productId}" data-color="${product.colors}">
                <div class="cart__item__img">
                    <img src="${detailProduct.imageUrl}" alt="${detailProduct.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${detailProduct.name}</h2>
                        <p>${product.colors}</p>
                        <p>${detailProduct.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `
            basket.push(detailProduct)
            
        };
        // localStorage.setItem("basket", JSON.stringify(basket));
          console.log(basket);
        
    };
        /********************** AJUSTE ARTICLE QUANTITY + PRIX TOTAL **********************/
    
    // function addQuantFunction() {

    //     let found2 = basketStorage.map((element) => element.quantity);
    //     //console.log(found2);
      
    //     const reducer = (previousValue, currentValue) => previousValue + currentValue;
    //     let quant = found2.reduce(reducer);
    //     console.log(quant);
    //     if(quant <= 1){
    //         document.querySelector(".cart__price").innerHTML = ` <p>Total ( ${quant} article) : <span id="totalPrice"><!-- 84,00 --></span> €</p>`
    //     }else{
    //         document.querySelector(".cart__price").innerHTML = ` <p>Total ( ${quant} articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>`
    //     }
        

    //   };

     

});
