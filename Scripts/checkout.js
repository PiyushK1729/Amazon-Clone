import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProducts} from '../data/products.js'
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

Promise.all([
  new Promise( (resolve) => {
    loadProducts(() => {
      resolve('value-1');
    })
  }) ,
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

/*
loadProducts( () => { 
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  })

})
 */ 
  
