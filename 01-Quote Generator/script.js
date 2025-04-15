const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSponner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote

function newQuote() {
  showLoadingSponner();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author is blank and replaceit with 'Unknwon'

  authorText.textContent = quote.author || "Unknown";

  // Check Quote length to determine styling

  if (quote.quote.length > 80) quoteText.classList.toggle("quote-long");

  // Set Quote , Hide loader

  quoteText.textContent = quote.quote;
  removeLoadingSpinner();
}

// tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listner

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Get Quotes from API

async function getQuotes() {
  showLoadingSponner();
  const apiUrl = "https://dummyjson.com/quotes";
  try {
    const respone = await fetch(apiUrl);
    const data = await respone.json();
    apiQuotes = data.quotes;
    newQuote();
  } catch (err) {
    // handling errors
    console.error(err.message);
  }
}

// On load
getQuotes();
