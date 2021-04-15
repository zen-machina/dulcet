// TODO
/* 
v0.4
--> MAIN GOALS: 
- able to select audio file(s) in folder and load them into playlist.
- playlist list artist name, song name, and length
--------------------------------------------------
--> TODO:
- Place audio files in a clean format.
- Use custom play / pause bottons for each audio file.
- Add delete functionality for playlist.
- Set audio file limit to 10 files.
*/

let fileInput = document.getElementById("fileInput");
let playList = document.querySelector(".playlist");
let playListItems = playList.children;
let audio = document.getElementById("audioElem");
let audioItem = document.querySelector(".audioItem");
let currentAudio = null;

// Event listeners ( outside of loop )
fileInput.addEventListener("change", addFiles);
audio.addEventListener("click", audioPlayPause);

function addFiles() {
    let myfiles = fileInput.files;

    for (var i = 0; i < myfiles.length; i++) {
        // Add if statement check to see if files <= 5

        // Creates a new li element and an a element inside of that li
        let newSong = document.createElement("li");
        let newSongFile = document.createElement("a");
        // Creates blobs of each file
        let myURL = URL.createObjectURL(myfiles[i]);

        // Clean up the URL Object after we are done with it
        newSongFile.addEventListener("load", () => {
            URL.revokeObjectURL(myURL);
        });
        // Adds eventlistener on each a tag
        newSongFile.addEventListener("click", audioPlayPause);

        // Adds class of .audioItem to newSongFile. Do I need this ?
        newSongFile.classList.add("audioItem");
        // Adds new objectURL into newSongFile href
        newSongFile.href = myURL;
        // Adds playbutton and file name to each newSongFile
        newSongFile.innerHTML = `<i class="fa fa-play"></i>${myfiles[i].name}`;
        // Appends elements inside playlist.
        playList.appendChild(newSong);
        newSong.appendChild(newSongFile);
        // Adds src attribute to the audio element.
        audio.src = myURL;
    }
    console.log(playListItems);
}

// Bug: when I load more songs while I have a song playing,
// then click on new song to play, the pause botton stays on previous song
function audioPlayPause(e) {
    e.preventDefault();

    // Checks to see if the clicked on song is currently loaded.
    let audioLoaded = this.getAttribute("href") === audio.getAttribute("src");

    if (audioLoaded && audio.paused) {
        console.log("if#1");
        currentAudio = this;
        setPauseIcon(currentAudio);
        audio.play();
    } else if (audioLoaded && !audio.paused) {
        console.log("elseif#2");
        currentAudio = this;
        setPlayIcon(currentAudio);
        audio.pause();
    } else {
        if (currentAudio) {
            console.log("else--if#4");
            setPlayIcon(currentAudio);
        }
        console.log("else#3");
        console.log(currentAudio);
        currentAudio = this;
        console.log(currentAudio);

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
