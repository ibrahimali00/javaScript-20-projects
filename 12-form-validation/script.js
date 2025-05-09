const from = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;

let passwordMatch = false;

function formValidate() {
  // Using Contratint API
  isValid = form.checkValidity();
  // Style main message for an error
  if (!isValid) {
    message.textContent = "Please fill out all fields .";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }

  // check for Matched Passwords
  if (password1El.value === password2El.value) {
    passwordMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    passwordMatch = false;
    message.textContent = "Make Sure Passwords Match.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }

  // if from is valid and passwords match
  if (isValid && passwordMatch) {
    message.textContent = "Successfully Registerd.";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  // Do some thing with this data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  // From Validare
  formValidate();
  // Submit Data if it is valid
  if (isValid && passwordMatch) {
    storeFormData();
  }
}

from.addEventListener("submit", processFormData);
