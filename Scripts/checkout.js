//before coming here we went to cart.js and gave cart 2 default values and then using the array of objects : cart...we are going to write HTML code for JS

import {cart , removeFromCart ,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js' //we use this to get full product info
import {formatCurrency} from './utils/money.js' //./ because we are in same folder trying to access another folder

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

import {deliveryOptions} from '../data/deliveryOptions.js';

hello();

const today = dayjs();
const deliveryDate = today.add(7 , 'days');

const todayDate = today.format('dddd, MMMM D' );

console.log(deliveryDate.format('dddd, MMMM D' ));

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId  //we use product id to get the images and every other details

  let matchingProduct;

  products.forEach((product)=>{   //we loop through the product array and check if the selected id is equal
    if (product.id === productId) { //to which id in array..and then we get full info of that product
      matchingProduct = product;  //inside the matchingProduct and using that we input the required info of product in our HTML in Js given below

    }
  });



  const deliveryOptionId= cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId){
      deliveryOption = option;
    }
  })

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays , 
      'days'
    )

    const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery Date - ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents) }
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
         
        ${deliveryOptionsHTML(matchingProduct , cartItem)}
        
      </div>
    </div>
  </div>

  `;
});

function deliveryOptionsHTML(matchingProduct , cartItem){
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays , 
      'days'
    )

    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents 
     === 0 
      ? 'Free'
      : `$${formatCurrency(deliveryOption.priceCents)}  `

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

  html +=  

  ` <div class="delivery-option js-delivery-option"
      deta-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked  ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} - Shipping
        </div>
      </div>
    </div>`
  })

  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-delete-link')
  .forEach((link)=> {
    link.addEventListener('click' , () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`) //here we used ${productId} because above we gave class as the ${matchingProduct.id} and the only time document.query will select the container of the product with the id same as the product we clicked delete button for...therefore delete when we click delete btn the container will be selected and using remove() will delete is from page
      container.remove();
    } )
  })

  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
    
    document.querySelector('.js-total-items')
    .innerHTML = `${cartQuantity} items`;
    });


      document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click' , () =>{
        const {productId , deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId , deliveryOptionId);
      })
    });