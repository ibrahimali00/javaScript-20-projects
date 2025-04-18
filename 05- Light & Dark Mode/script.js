const toggleSwitch = document.querySelector("input[type=checkbox]");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function toogleDarkLightMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgba(0 0 0 /50%)"
    : "rgba(225 225 225 /50%)";
  textBox.style.backgroundColor = isDark
    ? "rgba(225 225 225 /50%)"
    : "rgba(0 0 0 /50%)";
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  isDark ? imageMode("dark") : imageMode("light");
}

// image Mode
function imageMode(mode) {
  image1.src = `img/undraw_proud_coder_${mode}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `img/undraw_proud_coder_${mode}.svg`;
}

// Switch theme dynamically
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toogleDarkLightMode(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toogleDarkLightMode(false);
  }
}

// Event Listner
toggleSwitch.addEventListener("change", switchTheme);

// check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    toogleDarkLightMode(true);
  }
}

// Befor DRY
/* 
// Dark mode styles
function darkMode() {
  // nav.style.backgroundColor = "rgba(0 0 0 /50%)";
  // textBox.style.backgroundColor = "rgba(225 225 225 /50%)";
  // toggleIcon.children[0].textContent = "Dark Mode";
  // toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  // imageMode("dark");
}
// light mode styles
function lightMode() {
  // nav.style.backgroundColor = "rgba(225 225 225 /50%)";
  // textBox.style.backgroundColor = "rgba(0 0 0 /50%)";
  // toggleIcon.children[0].textContent = "Light Mode";
  // toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  // imageMode("light");
}

*/
