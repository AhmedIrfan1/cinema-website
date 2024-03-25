// Select all navigation buttons, video slides and contents
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slider");
const contents = document.querySelectorAll(".content");

// Function to change the active slide and content on button click
var sliderNav = function (manual) {
  btns.forEach((btn) => {
    btn.classList.remove("active"); // Remove the 'active' class from all buttons, slides and contents
  });

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  contents.forEach((content) => {
    content.classList.remove("active");
  });

  // Add the 'active' class to the clicked button
  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
  contents[manual].classList.add("active");
};

// Add click event listener to each navigation button
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});

// 10 Seconds
var intervalTime = 10000;

// set the index of the current active slide
var currentSlide = 0;

// define a function to change to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  sliderNav(currentSlide);
}

// set the interval to change slides automatically
setInterval(nextSlide, intervalTime);

// Select the cart icon, popup and close button
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.querySelector(".cart-popup");
const closeBtn = document.querySelector(".cart-popup .close-btn");

cartIcon.addEventListener("click", () => {
  cartPopup.classList.toggle("show"); // opens the cart when cart icon is clicked
});

closeBtn.addEventListener("click", () => {
  cartPopup.classList.remove("show"); // closes the cart when close button is clicked
});

var totalP = 0; // Initialize the total price to 0

// Function to add items to the cart
function addToCart(productName, quantity, pricePerUnit) {
  let cartItem = document.createElement("div"); // make a new element called cartItem
  let totalPrice = quantity * pricePerUnit;
  let total = document.getElementById("total");

  cartItem.innerHTML =
    productName + " - " + quantity + " x " + pricePerUnit + " = " + totalPrice; // display the item with qty and price

  total.innerHTML = "Your total is : &pound;" + (totalP + totalPrice);
  totalP += totalPrice;

  var cartSection = document.getElementById("cart"); // select cart
  cartSection.appendChild(cartItem); // Add the cartItem into cartSection
}

// Select all below
const checkOut = document.getElementById("checkout");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const checkCart = document.querySelector("#cart");
const modal = document.getElementById("payment-modal");
const closePayBtn = document.querySelector(".close");
const cardholderNameInput = document.getElementById("cardholder-name");
const cardholderEmailInput = document.getElementById("e-mail");
const payableAmount = document.getElementById("payable");

// Event listener for the checkout button to display the payment modal
checkOut.addEventListener("click", () => {
  if (formName.value.trim() === "" || formEmail.value.trim() === "") {
    // cheecks if name and email value is empty
    alert("Please fill in your name and email before proceeding");
  } else if (checkCart.children.length === 0) {
    // checks if cart is empty
    alert("Your cart is empty");
  } else {
    cartPopup.classList.remove("show"); // hides the cart popup
    modal.style.display = "block";
    payableAmount.innerHTML = "Your Total is : &pound;" + totalP; // sends Total and shows in order details
    cardholderNameInput.value = formName.value; // send the name value to payment form
    cardholderEmailInput.value = formEmail.value; // send the email value to payment form
  }
});

closePayBtn.addEventListener("click", () => {
  // close when clicked
  modal.style.display = "none";
});

// Event listener for the submit button on the payment form
const submitButton = document.getElementById("submit");
const form = document.querySelector("form");

submitButton.addEventListener("click", () => {
  if (form.checkValidity()) {
    // checks if form is valid
    modal.style.display = "none"; // close the payment modal
    clearCart(); // clear the cart
    alert("Your Purchase was Successful"); // alert
  } else {
    form.reportValidity(); // Display error messages for invalid fields
  }
});

// Event listener for the clear button to empty the cart
const clear = document.getElementById("clear");
const cart = document.getElementById("cart");

clear.addEventListener("click", () => {
  clearCart();
});

// Function to clear the cart and update the total price
function clearCart() {
  cart.innerHTML = "";
  totalP = 0;
  document.getElementById("total").innerHTML = "";
}
