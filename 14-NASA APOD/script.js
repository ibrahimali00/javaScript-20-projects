const resultsNav = document.getElementById('resultNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const savedConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorties = {};

function showContent(page) {
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  loader.classList.add('hidden');
}

function createDOMNodes(page) {
  const currentArray =
    page === 'results' ? resultsArray : Object.values(favorties);
  currentArray.forEach((res) => {
    const html = `
        <figure class="card">
          <a href="${res.hdurl}" title="View Full Image" target="_blank">
            <img
              class="card-img-top"
              src="${res.url}"
              alt="NASA Picture Of The Day"
              loading = 'lazy'
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${res.title}</h5>
            ${
              page === 'results'
                ? `            <p class="clickable" onclick= saveFavorite('${res.url}')>Add To Favorites</p>
            <p class="card-text"> ${res.explanation}
            </p>`
                : `            <p class="clickable" onclick= removeFavorite('${res.url}')>Remove From Favorites</p>
            <p class="card-text"> ${res.explanation}
            </p>`
            }
            <small class="text-muted">
              <strong>${res.date}</strong>
              <span>${res.copyright === undefined ? '' : res.copyright}</span>
            </small>
          </div>
        </figure>
    `;
    imagesContainer.insertAdjacentHTML('beforeend', html);
  });
}

function updateDom(page) {
  // Get Favorites from local storage
  if (localStorage.getItem('nasaFavorite')) {
    favorties = JSON.parse(localStorage.getItem('nasaFavorite'));
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

// Get 10 images from NASA APOD API
async function getNasaPictures() {
  // Show loader
  loader.classList.remove('hidden');

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    resultsArray = data;
    updateDom('results');
  } catch (err) {
    // Handling errors
    console.error(err.message);
  }
}

// Save To Favorites
function saveFavorite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorties[itemUrl]) {
      favorties[itemUrl] = item;
      // Show save confirmed for 2 sec
      savedConfirmed.classList.add('ch-opacity');
      setTimeout(() => {
        savedConfirmed.classList.remove('ch-opacity');
      }, 2000);
    }
    // Add favorites to local Storage
    localStorage.setItem('nasaFavorite', JSON.stringify(favorties));
  });
}

// Remove From Favorites
function removeFavorite(itemUrl) {
  if (favorties[itemUrl]) {
    delete favorties[itemUrl];
    // Update  local Storage
    localStorage.setItem('nasaFavorite', JSON.stringify(favorties));
    updateDom('favorites');
  }
}

getNasaPictures();
