const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disale / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing the joke to VoiceRSS API

function tellMe(joke) {
  VoiceRSS.speech({
    key: "d79e3e1763884560b0141854c8384892",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from API - Joke
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speach
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (err) {
    // Handling errors
    console.error(err.message);
  }
}

// Event listner
button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
