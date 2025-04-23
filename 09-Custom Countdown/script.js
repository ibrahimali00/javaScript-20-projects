const inputContainer = document.getElementById('input-container');
const countdownForm = document.querySelector('.countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownTitleEl = document.querySelector('.coutdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completEl = document.getElementById('complete');
const completInfoEl = document.querySelector('.complete-info');
const completeBtn = document.getElementById('complete-button');

let coutdownTitle = '';
let coutdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min value with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate Countdown from Form inputs
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide inputs
    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completInfoEl.textContent = `${coutdownTitle} finished on ${coutdownDate}`;
      completEl.hidden = false;
    } else {
      // populate countdown
      countdownTitleEl.textContent = `${coutdownTitle}`;
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = minutes;
      timeElements[3].textContent = seconds;

      // show countdown
      completEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Take User Input and Update Countdown
function updateCountDown(e) {
  e.preventDefault();
  coutdownTitle = e.srcElement[0].value;
  coutdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: coutdownTitle,
    date: coutdownDate,
  };

  console.log(savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  if (coutdownDate === '') {
    alert('Please select  a valid date to continue..');
  } else {
    // Get number verion of date and time , update DOM
    countdownValue = new Date(coutdownDate).getTime();
    updateDOM();
  }
}

//Reset All values
function reset() {
  // Hide countdown
  countdownEl.hidden = true;
  completEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);
  // Reset inpus values
  coutdownTitle = '';
  coutdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCoutdown() {
  // get data from local storage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    coutdownTitle = savedCountdown.title;
    coutdownDate = savedCountdown.date;
    countdownValue = new Date(coutdownDate).getTime();
    updateDOM();
  }
}

// Event Listener for Form Submission
countdownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load , check local Storage
restorePreviousCoutdown();
