import {cart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js'
import {addOrder} from '../../data/orders.js'


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents
  })

 const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
 const taxCents = totalBeforeTaxCents * 0.1;
 const totalCents = totalBeforeTaxCents + taxCents;


 const paymentSummaryHTML = `
  <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary
      js-place-order">
        Place your order
      </button>
 `;

 document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order')
  .addEventListener('click' , async () => {

    try{
      const response = await fetch('https://supersimplebackend.dev/orders' , { //here we are trying to give backend the data we need to display using post
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/json' //this tells backend what type of data it is
        } ,
        body : JSON.stringify({ //and this the data we are giving but we cant send and object to backend so we are converting it into json string using JSON.stringify
          cart : cart
        })
      })

      const order = await response.json() //this contains the data backend gets from our cart which we have to order

      addOrder(order);
    } catch(error) {
      console.log('Unexpected Error');
    }

    //window.location.href = 'orders.html';  //this gets you to the another location or file!!

  }) 
}