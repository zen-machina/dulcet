// TODO
/* 
v0.9
--> MAIN GOALS: 
- create audio visualizer
- fine tune how audio file names are displayed
- make app look better
- display "limit of 5 files" when user tries to upload too many files
*/

// Global Variables
let fileInput = document.getElementById("fileInput");
let playList = document.querySelector(".playlist");
let playListItems = playList.children;
let itemIcons = playListItems.children;
let audio = document.getElementById("audioElem");
let currentAudio = null;
let canvas = document.querySelector(".visualizer");
let ctx = canvas.getContext("2d");

// Event listeners
fileInput.addEventListener("change", addFiles);
audio.addEventListener("click", audioPlayPause);

function addFiles() {
  let myfiles = fileInput.files;
  let pauseIcons = playList.querySelectorAll(".fa-pause");

  // Checks if there is a file playing when uploading more files
  if (pauseIcons.length > 0) {
    setPlayIcon(pauseIcons[0].parentElement);
    audio.pause();
  }

  // Checks if there are already 5 audio files
  if (playListItems.length > 4 || myfiles.length > 4) {
    console.log("There is a limit of 5 files...");
  }

  // Adds audio files
  for (var i = 0; i < myfiles.length; i++) {
    if (playListItems.length > 4) {
      break;
    } else {
      let audioItem = document.createElement("a");
      // Creates blobs of each file
      let myURL = URL.createObjectURL(myfiles[i]);
      // Clean up the URL Object after we are done with it
      audioItem.addEventListener("load", () => {
        URL.revokeObjectURL(myURL);
      });

      // Sets up audioItems ( audio files )
      audioItem.addEventListener("click", audioPlayPause);
      audioItem.addEventListener("click", createVisualizer);
      audioItem.href = myURL;
      audioItem.innerHTML = `<i class="fa fa-play"></i>${myfiles[i].name}`;
      playList.appendChild(audioItem);
      audio.src = myURL;
    }
  }
}

// Allows each audio file to be played or paused
function audioPlayPause(e) {
  e.preventDefault();

  // Checks to see if the clicked on song is currently loaded.
  let audioLoaded = this.getAttribute("href") === audio.getAttribute("src");

  if (audioLoaded && audio.paused) {
    currentAudio = this;
    setPauseIcon(currentAudio);
    audio.play();
  } else if (audioLoaded && !audio.paused) {
    currentAudio = this;
    setPlayIcon(currentAudio);
    audio.pause();
  } else {
    if (currentAudio) {
      setPlayIcon(currentAudio);
    }
    currentAudio = this;
    setPauseIcon(currentAudio);
    audio.src = currentAudio.href;
    audio.play();
  }
}

// Removes play icon and adds pause icon
function setPauseIcon(elem) {
  let icon = elem.querySelector("i");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
}

// Removes pause icon and adds play icon
function setPlayIcon(elem) {
  let icon = elem.querySelector("i");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
}

function createVisualizer() {
  // Create new AudioContext node
  let audioCtx = new AudioContext();
  // Create Analyser node
  let analyser = audioCtx.createAnalyser();
  // Convert audio element into a node
  let source = audioCtx.createMediaElementSource(audio);
  // Connects our audio to an analyser then back to the default output
  source.connect(analyser);
  source.connect(audioCtx.destination);

  // Print the analyzed frequencies
  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  console.log(frequencyData);
}
