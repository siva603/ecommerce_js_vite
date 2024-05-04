export const updateCartValue = (cardProductsFromLS) =>{

    document.querySelector(".cart-btn").innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${cardProductsFromLS.length}`

}