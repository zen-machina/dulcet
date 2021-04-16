// TODO
/* 
v0.9
--> MAIN GOALS: 
- create audio visualizer: X
- create function for when audio is done playing
- fine tune how audio file names are displayed X
- make app look better
- display "limit of 5 files" when user tries to upload too many files
---> NOTES:
- Bug: Sound distortion using Firefox with repeated pausing and playing of audio
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
let audioCtx = null;

// Event listeners
fileInput.addEventListener("change", addFiles);
audio.addEventListener("click", audioPlayPause);

// Funtions
function addFiles() {
    let myfiles = fileInput.files;
    let pauseIcons = playList.querySelectorAll(".fa-pause");
    // Adds function for when audio is finished playing
    audio.addEventListener("ended", playNext);

    // Checks if there is a file playing when uploading more files
    if (pauseIcons.length > 0) {
        setPlayIcon(pauseIcons[0].parentElement);
        audio.pause();
    }

    // Checks if there are already 5 audio files
    if (playListItems.length > 4 || myfiles.length > 4) {
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
            audioItem.href = myURL;
            audioItem.classList.add("notPlaying");
            //vim-prettier auto formatting this part weird
            audioItem.innerHTML = `<i class="fa fa-play"></i>${myfiles[
                i
            ].name.replace(/\.[^/.]+$/, "")}`;
            playList.appendChild(audioItem);
            audio.src = myURL;
        }
    }
}

// Allows each audio file to be played or paused
function audioPlayPause(e) {
    e.preventDefault();

    // Create Visualizer
    if (!audioCtx) {
        createVisualizer();
    }

    // Checks to see if the clicked on song is currently loaded
    let audioLoaded = this.getAttribute("href") === audio.getAttribute("src");

    if (audioLoaded && audio.paused) {
        currentAudio = this;
        setPauseIcon(currentAudio);
        audio.play();
        togglePlayClass(currentAudio);
    } else if (audioLoaded && !audio.paused) {
        currentAudio = this;
        setPlayIcon(currentAudio);
        audio.pause();
        togglePlayClass(currentAudio);
    } else {
        if (currentAudio) {
            setPlayIcon(currentAudio);
        }
        currentAudio = this;
        setPauseIcon(currentAudio);
        audio.src = currentAudio.href;
        audio.play();
        togglePlayClass(currentAudio);
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

function togglePlayClass(elem) {
    if (elem.classList.contains("playing")) {
        elem.classList.remove("playing");
        elem.classList.add("notPlaying");
    } else if (elem.classList.contains("notPlaying")) {
        elem.classList.remove("notPlaying");
        elem.classList.add("playing");
    }
}

// Need to wite a function that plays next song once current one is finished playing
function playNext() {
    let currentAudio = playList.querySelector(".playing");
    let nextAudio = currentAudio.nextSibling;

    console.log(currentAudio.innerHTML);
    if (currentAudio && nextAudio) {
        setPlayIcon(currentAudio);
        setPauseIcon(nextAudio);
        audio.src = nextAudio.href;
        audio.play();
        console.log(currentAudio.innerHTML);
        // make class switching it's own function
        togglePlayClass(currentAudio);
        console.log(nextAudio.innerHTML);
        togglePlayClass(nextAudio);
    } else {
        togglePlayClass(currentAudio);
    }
}

function createVisualizer() {
    // Create new AudioContext node
    let audioCtx = new AudioContext();
    // Convert audio element into a node
    let source = audioCtx.createMediaElementSource(audio);
    // Create Analyser node
    let analyser = audioCtx.createAnalyser();
    // Connects our audio to an analyser then back to the default output
    source.connect(analyser);
    source.connect(audioCtx.destination);
    analyser.fftSize = 2048;

    // Print the analyzed frequencies
    let bufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    const barWidth = (canvas.width / bufferLength) * 2.5;

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        let bar = 0;
        analyser.getByteFrequencyData(frequencyData);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = frequencyData[i] - 75;
            const r = barHeight + 25 * (i / bufferLength);
            ctx.fillStyle = `rgb(${r},0, 0)`;
            ctx.fillRect(bar, canvas.height - barHeight, barWidth, barHeight);
            bar += barWidth + 2;
        }
    }

    renderFrame();
}
