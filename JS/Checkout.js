let cartItems = [];
let cartItemswithout = [];
let details

// function for getting the books cart info from the buy product page
function init() {
  let orderDetails = localStorage.getItem("order");
  const form = document.getElementById("form");

  details = JSON.parse(orderDetails);

  form.elements.name.value = details.user.name
  form.elements.email.value = details.user.email


  if (details && details.cart) {
    cartItems =  details.cart
    console.log(cartItems);
    updateCart();

	if(details.user.expressDelivery){
		let ex = document.getElementById("express");
		ex.innerHTML = `Express Delivery $20`
	}
  }
}

// function for getting the courses cart info from the buy product page
function initwithout() {
  let orderDetails = localStorage.getItem("order");
  details = JSON.parse(orderDetails);
  if (details.cart) {
    cartItemswithout = details.cart
    updateCartwithout();
  }
}

// Update the cart
function updateCart() {
  let cartList = document.getElementById("cartList");
  let total = document.getElementById("total");
  total.innerHTML = `$${details.total}`

  cartList.innerHTML = "";
  for (let i = 0; i <cartItems.length; i++) {
    console.log(cartItems[i]);
    let item = cartItems[i];
    let listItem = document.createElement("li");
    listItem.innerHTML =
      item.name + " (" + item.quantity + ") - $" + item.price * item.quantity;
    cartList.appendChild(listItem);
  }
}

// Update the cart V2
function updateCartwithout() {
  let cartListwithout = document.getElementById("cartListwithout");
  cartListwithout.innerHTML = "";
  for (let i = 0; i <cartItemswithout.length; i++) {
    let item = cartItemswithout[i];
    let listItem = document.createElement("li");
    listItem.innerHTML = item.name;
    cartListwithout.appendChild(listItem);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// function for form input
function submitOrder(event) {
	console.log(event);
  event.preventDefault();
  const form = document.getElementById("form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const zip = document.getElementById("zip");
  const cname = document.getElementById("cname");
  const cnum = document.getElementById("cnum");
  const expdate = document.getElementById("expdate");
  const cvv = document.getElementById("cvv");

  // Validations for form control
  if(!name.value.trim() ){
    setErrorFor(name, "Name Required");
  }
  else{
        setSuccessFor(name);
  }

  if(!email.value.trim() ){
    setErrorFor(email, "Email Required");
  }
  else{
    setSuccessFor(email);
  }

  if(!address.value.trim() ){
    setErrorFor(address, "Address Required");
  }
  else{
    setSuccessFor(address);
  }

  if(!zip.value.trim() ){
    setErrorFor(zip, "Zip Code Required");
  }
  else{
    setSuccessFor(zip);
  }

  if(!cname.value.trim() ){
    setErrorFor(cname, "Card Name Required");
  }
  else{
    setSuccessFor(cname);
  }

  if(!cnum.value.trim() ){
    setErrorFor(cnum, "Card Number Required");
  }
  else{
    setSuccessFor(cnum);
  }

  if(!expdate.value.trim() ){
    setErrorFor(expdate, "Date Required");
  }
  else{
    setSuccessFor(expdate);
  }

  if(!cvv.value.trim() ){
    setErrorFor(cvv, "CVV Required");
  }
  else{
        setSuccessFor(cvv);
  }

  // Alert for the Payment
  if(name.value && email.value && zip.value && address.value && cname.value && cnum.value && expdate.value && cvv.value){
    alert("Thanks For Your Purchase")
    window.location.href="Product.html"
  }
}

let load = document.getElementById("load");
console.log(load, document);

document.addEventListener("DOMContentLoaded", function () {
  init();
  document
    .getElementById("form")
    .addEventListener("submit", submitOrder);
});