export const orders = JSON.parse(localStorage.getItem('orders')) || []; //if there is no order in local storage then it will return empty array

export function  addOrder(order) {
  orders.unshift(order); //.unshift makes the most recent order in front of the array!!!
  saveToStorage(); 
}


function saveToStorage() {
  localStorage.setItem('orders' , JSON.stringify(orders)) //localStorage can only store string so we are converting the array into string using JSON.stringify
}