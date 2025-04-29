const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('modal-from');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmars-container');

let bookmarks = [];

// Show modal and focus On first INput

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal event Listner
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) =>
  e.target === modal ? modal.classList.remove('show-modal') : false
);

// Validate form data
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~ #?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('Please submit values for both fiels.');
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid website');
    return false;
  }

  return true;
}

// build bokmarks DOM

function buildBookMarks() {
  // Remove all Bookmarks form DOM
  bookmarkContainer.textContent = '';
  // Build Items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // CLose Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark');
    closeIcon.setAttribute('title', 'Delete BookMark');
    closeIcon.setAttribute('onclick', `deleteBookMark('${url}')`);

    // Fav Icon / Link container

    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Fav ICon
    const favIcon = document.createElement('img');

    favIcon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favIcon.setAttribute('alt', 'FavIcon');

    // link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = `${name}`;
    // append to bookmark container
    linkInfo.append(favIcon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);

    // const html = `
    //   <div class="item">
    //     <i
    //       class="fa-solid fa-xmark"
    //       id="bookmark-delete"
    //       title="Delete BookMark"
    //     ></i>
    //     <div class="name">
    //       <img src="favicon.png" alt="favicon" />
    //       <a href="${url}" target="_blank">${name}</a>
    //     </div>
    //   </div>
    // `;
    // bookmarkContainer.insertAdjacentHTML('beforeend', html);
  });
}

// fetch bookmarks from local storage
function fetchBookMarks() {
  // get bookmarks from local storage if avilable
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create a book mark in local storage
    bookmarks = [
      {
        name: 'Google',
        url: 'https://google.com',
      },
    ];
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  buildBookMarks();
}

// Delete BookMark
function deleteBookMark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // Update book marks array in Local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookMarks();
}

// handle Data from form

function storeBookMark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookMarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// event listner
bookmarkForm.addEventListener('submit', storeBookMark);

// On load
fetchBookMarks();
