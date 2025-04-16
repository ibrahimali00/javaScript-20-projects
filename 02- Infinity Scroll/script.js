const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "SVmeX8Mnz533nWUJyRONNhhpuD5tVl8g1H0NNGMEP1c";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images are loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//Create elements for links and photos , reneder to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each photo in each photo Array
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // craete <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // event listener , check when each photo finished loading

    img.addEventListener("load", imageLoaded);
    // put <img> inside <a> and add them to image container
    item.appendChild(img);
    imageContainer.appendChild(item);

    // another way to render photos
    // const html = `<a href="${photo.links.html}" target="_blank">
    //                 <img src="${photo.urls.regular}" alt="photo.alt_description" title = ${photo.alt_description}>
    //               </a>`;
    // imageContainer.insertAdjacentHTML("beforeend", html);
  });
}

// Get Photos from unsplash

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    // Handling errors
    console.error(err.message);
  }
}

// Check to see if scrolling near the bottom of page , load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// onload
getPhotos();
