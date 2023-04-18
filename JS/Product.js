// initializing cart, total, and courses list
let cart = [];
let total = 0;
let courses = ["Programming Principles", "Full Stack Software Development", "UI/UX Design Specialization"]

// function to add Books to the cart
function addToCart(itemName, itemPrice, quantity = 1) {
    let qt = quantity 
    if(itemName === "Python for Kids to Code"){
        const inputElements = document.getElementsByClassName("quantity1");
        qt= parseInt(inputElements[0].value)
        console.log(qt);
        if(isNaN(qt) || qt === 0){
            return
        }
    }
     if(itemName === "Ace the Data Science Interview"){
        const inputElements = document.getElementsByClassName("quantity2");
        qt= parseInt(inputElements[0].value)
        if(isNaN(qt) || qt === 0){
            return
        }
    }
    if(itemName === "Don't Make Me Think"){
        const inputElements = document.getElementsByClassName("quantity3");
        qt= parseInt(inputElements[0].value)
        if(isNaN(qt) || qt === 0){
            return
        }
    }
    
    for(const d of cart){
        if(d && d.name === itemName && courses.includes(itemName)){
            alert("You have already purchased this course!");
            return;
        }
    }

    if(itemName && courses.includes(itemName)){
        const startLearningBtn = document.querySelector(`button.startLearning[id="${itemName}"]`);
			if (startLearningBtn) {
				startLearningBtn.disabled = true;
			}
  }
    
  // Checkng if the item is already in the cart
  let itemIndex = cart.findIndex(item => item.name === itemName);
  if (itemIndex !== -1) {
    // Updating the quantity
    cart[itemIndex].quantity += qt;
  } 
  else {
    // if the item is not in the cart, add it to the cart
      alert(`${ itemName} x ${qt} is added to cart` )
      cart.push({name: itemName, price: itemPrice, quantity: qt});
  }
  // updating the total
  total += itemPrice * qt;
  updateCart() 
}

// function to add Courses to the cart without quantity
function addToCartWithout(itemName, itemPrice) {
  addToCart(itemName, itemPrice);
}

// function to update the cart and total
function updateCart() {
  // getting the cart list element
  let cartList = document.getElementById("cartList");
  let cartListwithout = document.getElementById("cartListwithout");

  // clearing the cart list element
  cartList.innerHTML = "";
  cartListwithout.innerHTML = "";

  // updating the cart list element with the items in the cart
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
    cartList.appendChild(li);
  });
  
  // updating the total element
  document.getElementById("total").innerText = `Total: $${total}`;
}

// function to clear the cart and total
function clearCart() {
  cart = [];
  total = 0;

  for(const c of courses){
    const startLearningBtn = document.querySelector(`button.startLearning[id="${c}"]`);
    if (startLearningBtn) {
      startLearningBtn.disabled = false;
    }
  }
  updateCart();
}

// function for express delivery
function expressChecked (){
  let expressDelivery = document.getElementById("ExpressDelivery").checked;
  console.log(expressDelivery);
  let expressDiv = document.getElementById("express");
  expressDiv.innerHTML =""
  if(expressDelivery){
    let li = document.createElement("li");
    li.innerText = "Express fee  $20 "
    expressDiv.appendChild(li) 
    total += 20
    updateCart()

  }else{
    total -= 20
    updateCart()
  }
}

// function for checkout
function checkout() {
  // getting the user information from the form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let expressDelivery = document.getElementById("ExpressDelivery").checked;

if (cart.length === 0 ) {
  alert("Your cart is Empty. Please add some Items to your cart before Checking Out.");
  return;
}

if(!name || !email ){
  alert("Provide your Name and your Email to continue.");
  return;
}

if(email &&  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
  alert("Not a valid email.");
  return;
}
  // creating an order object with the cart, total, and user information
  let order = {
    cart: cart,
    total: total,
    user: {
      name: name,
      email: email,
      expressDelivery: expressDelivery
    }
  }

  // sending the order to the server using local storage
  localStorage.setItem("order", JSON.stringify(order));
  window.location.href="Checkout.html"
  console.log("Order:", order);

  // clearing the cart and total
  clearCart();
}