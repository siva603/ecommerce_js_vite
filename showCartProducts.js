import { getCartProductsFromLS } from "./getCartProductsFromLS";
import products from './api/products.json';
import { updateCartValue } from "./updateCartValue";

// import homeQuantityToggle from './homeQuantityToggle.js'

const cartContainer = document.querySelector(".cartProduct");
const cartTemplate = document.querySelector(".section-template--cart");
const finalDiv = document.querySelector(".cartTotalDiv");



export const showCartProducts = (product) =>{

    if(!product){
        return false;
      }

      let quantityCartFromLS = cartProductsFromLs.filter((item)=>{

      if(item.id === product.id) {
          return item;
        }
      })

      let quantity = quantityCartFromLS[0].quantity; // local storage quantity number

      const {category,id, image, name, price, stock} = product;
    
      const cartClone = document.importNode(cartTemplate.content, true)
    
      cartClone.querySelector("#cardValue").setAttribute("id",`cart${id}`);
    
      cartClone.querySelector(".category").textContent = category;

      cartClone.querySelector(".img").src = image;
      cartClone.querySelector(".heading").textContent = name;
      
      cartClone.querySelector(".price").textContent = price * Number(quantity);
     
      cartClone.querySelector(".quantity").textContent=quantity;

      cartClone.querySelector(".button").addEventListener("click",(event)=>{

        homeQuantityToggle(event,id,stock,price);
        finalPriceForAllProducts(cartProductsFromLs);

      })
    
      cartClone.querySelector(".btn-remove").addEventListener( "click",(event)=>{
       removeToCart(id);
       finalPriceForAllProducts(cartProductsFromLs);
      })
    
      cartContainer.append(cartClone);
    
}

const removeToCart = (id) =>{

  const removeDiv = cartContainer.querySelector(`#cart${id}`);

  console.log( removeDiv );
  
   cartProductsFromLs = cartProductsFromLs.filter((item) => item.id !== id);

    console.log( cartProductsFromLs );
    

    if(removeDiv){
      removeDiv.remove();
    }

    updateCartValue(cartProductsFromLs)
    localStorage.setItem("cartProductLS",JSON.stringify(cartProductsFromLs));

}

 const homeQuantityToggle = (event, id, stock , originalPrice) =>{

  // quantityCartFromLs is array remember it.

  let quantityCartFromLS = cartProductsFromLs.find((item)=>{

    if(item.id === id) {
        return item;
      }
    })

  const cartElement = document.querySelector(`#cart${id}`);

  // console.log(cartElement)

  const quantityELement = cartElement.querySelector(".quantity");

  const priceElement = cartElement.querySelector(".price")

  // console.log( quantityELement );

  let quantity = quantityCartFromLS.quantity || 1;
  
  // console.log( quantityCartFromLS );

  if(event.target.className === "btnIncreament"){

      // console.log( event.target.className, quantity, stock );

      
      if(quantity < stock){

        quantity+=1;

        let total = quantity * originalPrice;

        quantityELement.innerText = quantity;

        priceElement.innerText = total;

        quantityCartFromLS.quantity = quantity;
        
        quantityCartFromLS.price =total ;
    
        localStorage.setItem("cartProductLS",JSON.stringify(cartProductsFromLs));

        // quantityELement.setAttribute("quantity-data",quantity)

        //  return quantity+=1;
      }
     else if(quantity === stock){

      quantityELement.innerText = quantity;


     }
  }

  if(event.target.className === "btnDecreament"){

      if( quantity > 1){

        quantity-=1;

        let total = quantity * originalPrice;

        quantityELement.innerText = quantity;

        priceElement.innerText = total;

        quantityCartFromLS.quantity = quantity;

        quantityCartFromLS.price =total;
    
        localStorage.setItem("cartProductLS",JSON.stringify(cartProductsFromLs));
          
      }
  }
  

}

const finalPriceForAllProducts = (cartProductsFromLs) =>{

  const totalElement = finalDiv.querySelector(".totalPrice");
  const finalElement = finalDiv.querySelector(".final");

 let final = 0;
 let total = 0;

 cartProductsFromLs.forEach(element => {
      total+=parseInt(element.price);
      
 });

 final+=total + 50;

 totalElement.innerText = `₹ ${total}`;

 finalElement.innerText = `₹ ${final}`;

 return true;
}

let cartProductsFromLs = getCartProductsFromLS();
// console.log(products)
// console.log( cartProductsFromLs );

updateCartValue(cartProductsFromLs);

let filterProducts = products.filter((product) =>{
    return cartProductsFromLs.some((item) => item.id === product.id);
})
// console.log( filterProducts );

filterProducts.map((product)=>{
    
    showCartProducts(product)
})

finalPriceForAllProducts(cartProductsFromLs);

