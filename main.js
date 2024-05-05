import './style.css'
import products from './api/products.json'
import { homeQuantityToggle } from './homeQuantityToggle'
import { addToCart } from './addToCart'
import { getCartProductsFromLS } from './getCartProductsFromLS'
import { updateCartValue } from './updateCartValue';

var productContainer = document.querySelector(".productContainer")
var templateContainer = document.querySelector(".section-template")
let visible = document.querySelector(".visible");
let toast = document.querySelector(".toast")
let loaderContainer = document.querySelector(".loader-container");
// let root = document.documentElement;

let value = 0;

setTimeout(()=>{
  value = 1;
},10000)

window.addEventListener('load', () =>{
 const load_name = setInterval(()=>{
    if(value == 1){
    loaderContainer.classList.add("hidden");
    }
  },1000)

  if(value == 1){
    load_name.clearInterval();
  }
})

const showProduct = (item) =>{

  if(!item){
    return false;
  }

  const {brand, category, description, id, image, name, price, stock} = item;

  const productClone = document.importNode(templateContainer.content, true)

  productClone.querySelector("#cardValue").setAttribute("id",`card${id}`);

  productClone.querySelector(".category").textContent = category;
  productClone.querySelector(".img").src = image;
  productClone.querySelector(".heading").textContent = name;
  productClone.querySelector(".para").textContent = description;
  productClone.querySelector(".discountPrice").textContent = price;
  productClone.querySelector(".orginalPrice").textContent = price*3;
  productClone.querySelector(".stock").textContent = stock;

  productClone.querySelector(".button").addEventListener("click",(event)=>{
    
    homeQuantityToggle(event,id,stock)

    updateCartValue(getCartProductsFromLS())
  })

  productClone.querySelector(".btn").addEventListener("click",(event)=>{

    visible.classList.add("success")
    toast.innerText = `Product Id : ${id} add to cart`

    addToCart(event,id,stock)

    setTimeout(()=>{
      visible.classList.remove("success")
    },5000)

    updateCartValue(getCartProductsFromLS());
  })

  productContainer.append(productClone);
}



products.map((item)=>{
  showProduct(item);
})

updateCartValue(getCartProductsFromLS());
