const videoEl = document.getElementById("video");
const btn = document.getElementById("button");

// promot to select media stream , pass element to video and play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoEl.srcObject = mediaStream;
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (err) {
    // Hndling ant errors
    console.error("Whoops ! something went wrong");
  }
}

btn.addEventListener("click", async () => {
  // Disable the button
  btn.disabled = true;
  // Strat picture in picture
  await videoEl.requestPictureInPicture();
  // Reset the button
  btn.disabled = false;
});

// onload
selectMediaStream();
