// this. is used inside an object which points to the outer object  basically this lets an object use its own property!!


class Cart {
  cartItems;
  #localStorageKey; //# is used to implement private property so it can be accessed only in this class


  //constructor is used to put setup code in the class
  constructor (localStorageKey) { 
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();

  }


  #loadFromStorage() {        //loadFromStorage :  function() replaced this with loadFromStorage() as shortcut
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ;

    if(!this.cartItems){
      this.cartItems = [{
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
    } 


  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  } 

  addToCart(productId){
        let matchingItem;       //this is to find the cartItem which is equal to the productId to know which product is in the cart

      this.cartItems.forEach((cartItem) =>{
        if( productId === cartItem.productId ){
          matchingItem = cartItem;
        }
      })

      if(matchingItem){
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId : productId ,
          quantity : 1 , 
          deliveryOptionId : '1'
        });
      }

      this.saveToStorage();
  } 


  removeFromCart(productId){
    const newCart =[]

    this.cartItems.forEach((cartItem)=>{
      if (cartItem.productId !== productId){
        newCart.push(cartItem)
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  } 

    //the below function is for updating deliveryOptionId...like 1 or 2 or 3 and for that we take two parameters which is productId...for knowing the product we want our deliveryOptionId to change the the deliveryOptionId itself for the option we chose
  updateDeliveryOption(productId , deliveryOptionId) {
    let matchingItem;
      this.cartItems.forEach((cartItem) =>{
        if( productId === cartItem.productId ){
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }




  const cart = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');


  console.log(cart);
  console.log(businessCart)
  console.log(businessCart instanceof Cart)
