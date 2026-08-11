export let cart = JSON.parse(localStorage.getItem('cart')) ;

if(!cart){
  cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' ,
  quantity : 2 ,
  deliveryOptionId : '1'
} , {
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d' ,
  quantity : 1 ,
  deliveryOptionId : '2'
}];
;
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
        let matchingItem;       //this is to find the cartItem which is equal to the productId to know which product is in the cart

      cart.forEach((cartItem) =>{
        if( productId === cartItem.productId ){
          matchingItem = cartItem;
        }
      })

      if(matchingItem){
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId : productId ,
          quantity : 1 , 
          deliveryOptionId : '1'
        });
      }

      saveToStorage();
}

export function removeFromCart(productId){
  const newCart =[]

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  });

  cart = newCart;

  saveToStorage();
};



  //the below function is for updating deliveryOptionId...like 1 or 2 or 3 and for that we take two parameters which is productId...for knowing the product we want our deliveryOptionId to change the the deliveryOptionId itself for the option we chose
export function updateDeliveryOption(productId , deliveryOptionId) {
  let matchingItem;
    cart.forEach((cartItem) =>{
      if( productId === cartItem.productId ){
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  };

