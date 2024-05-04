export const homeQuantityToggle = (event, id, stock) =>{

    const productElement = document.querySelector(`#card${id}`);

    // console.log(productElement)

    const quantityELement = productElement.querySelector(".quantity");

    // console.log( quantityELement );

    let quantity = parseInt(quantityELement.getAttribute("quantity-data")) || 1 ;

    if(event.target.className === "btnIncreament"){
        // console.log( event.target.className, quantity, stock );
        if(quantity < stock){
            quantity+=1;
        }
       else if(quantity === stock){
            quantity = stock;
       }
    }

    if(event.target.className === "btnDecreament"){
        if( quantity > 1){
            quantity-=1;
            
        }
    }
    
    quantityELement.innerText = quantity;
    quantityELement.setAttribute("quantity-data",quantity)
}