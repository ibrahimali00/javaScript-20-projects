const menuBars = document.getElementById("menu-bars");
const overlay = document.querySelector(".overlay");
const navItems = document.querySelectorAll(".nav-item");

function toggleNav() {
  // Toggle: Menu Bars open/close
  menuBars.classList.toggle("change");
  // Toggle Menu active
  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    // Animate In - overlay
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    // Animate In - Nav Item
    navItems.forEach((nav, i) => {
      nav.classList.replace(`slide-out-${i + 1}`, `slide-in-${i + 1}`);
    });
  } else {
    // Animate - Out overlay
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    // Animate In - Nav Item
    navItems.forEach((nav, i) => {
      nav.classList.replace(`slide-in-${i + 1}`, `slide-out-${i + 1}`);
    });
  }
}

//Event Listner
menuBars.addEventListener("click", toggleNav);
navItems.forEach((nav) => nav.addEventListener("click", toggleNav));
