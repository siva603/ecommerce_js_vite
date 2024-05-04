import {  updateCartValue } from './updateCartValue.js';
import { getCartProductsFromLS } from './getCartProductsFromLS.js'

export const addToCart = (event,id,stock) =>{

    let arrCartLocalStorage = getCartProductsFromLS();

    updateCartValue(arrCartLocalStorage);

    const productElement = document.querySelector(`#card${id}`);
    let quantity = Number(productElement.querySelector(".quantity").innerText);

    // console.log(productElement)

    let exist = arrCartLocalStorage.find(each => each.id===id);

   if(exist && quantity > 1){

    // console.log( "existing : ",exist ); 

    exist.quantity= quantity + exist.quantity || quantity ;

    let price = Number(exist.quantity * Number(productElement.querySelector(".discountPrice").innerText))
    exist.price= price;

    // console.log("updated : ", exist );
    
    localStorage.setItem("cartProductLS",JSON.stringify(arrCartLocalStorage))
    
    return true;
   }

   if(exist)
    return false;

    let price = Number(quantity * Number(productElement.querySelector(".discountPrice").innerText))

    // console.log( "id : ",id ,"quantity : ", quantity ,"price : ", price );
    arrCartLocalStorage.push({id,quantity,price})

    // console.log( "first time ", arrCartLocalStorage );
    
   return localStorage.setItem("cartProductLS",JSON.stringify(arrCartLocalStorage));
}