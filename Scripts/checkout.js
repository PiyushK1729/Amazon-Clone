import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProducts , loadProductsFetch} from '../data/products.js'
import {loadCart} from '../data/cart.js'
// import '../data/cart-class.js';
//import '../data/backendPractice.js' //for practise only!!

//loadProducts(renderOrderSummary);
//loadProducts(renderPaymentSummary);


/*
new Promise( (resolve) => {  //promise creates 2 group of codes..in one group promise is running and in another the rest of the code like loadProducts(below) is running and using resolve with loadProducts in promise makes it run first and then only go to next like which in this case is .then()
  loadProducts(() => {
    resolve('value 1');
  });

}).then((value) => {
  console.log(value);
  return new Promise( (resolve) => {
    loadCart(() => {
      resolve();
    });
  })

}).then( () => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/    

async function loadPage() {
  try { //this try the code written inside and check for error and if there is error it goes to catch

    //throw 'error1' this gives error manually

  await loadProductsFetch(); //await helps in first executing the given code and then goes to next line
                            //first the product loads and wait for it to load using await

  await new Promise((resolve , reject) => { //then cart is loaded and waited for it using await
    
    // throw 'error2'

    loadCart(() => {
      // reject('error3)
      resolve();
    });
  }); 
  } catch (error) { //after the error this executes
    console.log('Unexpected Error. Please try again')
  }

 

    renderOrderSummary(); //then simply desplay it using these functions
    renderPaymentSummary();

}
loadPage();

/*
Promise.all([
  loadProductsFetch() ,
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })

]).then( (values) => {
  console.log(values)
    renderOrderSummary();
    renderPaymentSummary();  
})
*/

/*
loadProducts( () => { 
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  })

})
 */ 
  
