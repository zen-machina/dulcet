// TODO
/* 
v0.5
--> MAIN GOALS: 
- able to select audio file(s) in folder and load them into playlist.
- playlist list artist name, song name, and length
--------------------------------------------------
--> TODO:
- Try not to use li items in list, stick with only a tags
- Figure out a way to reset ( pause and play icons ) to all song items if adding 
more songs.
- implement more catch all conditions when loading files.
*/

let fileInput = document.getElementById("fileInput");
let playList = document.querySelector(".playlist");
let playListItems = playList.children;
let itemIcons = playListItems.children;
let audio = document.getElementById("audioElem");
let currentAudio = null;

// Event listeners ( outside of loop )
fileInput.addEventListener("change", addFiles);
audio.addEventListener("click", audioPlayPause);

function addFiles() {
  let myfiles = fileInput.files;

  // Add if statement check to see if files > 5
  if (playListItems.length > 4) {
    console.log("There is a limit of 5 audio files.");
  } else {
    for (var i = 0; i < myfiles.length; i++) {
      // Creates a new li element and an a element inside of that li
      let audioItem = document.createElement("a");
      // Creates blobs of each file
      let myURL = URL.createObjectURL(myfiles[i]);

      // Clean up the URL Object after we are done with it
      audioItem.addEventListener("load", () => {
        URL.revokeObjectURL(myURL);
      });
      // Adds eventlistener on each a tag
      audioItem.addEventListener("click", audioPlayPause);

      // Adds class of .audioItem to  audioItem. Do I need this ?
      audioItem.classList.add("audioItem");
      // Adds new objectURL into  audioItem href
      audioItem.href = myURL;
      // Adds playbutton and file name to each  audioItem
      audioItem.innerHTML = `<i class="fa fa-play"></i>${myfiles[i].name}`;
      // Appends elements inside playlist.
      playList.appendChild(audioItem);
      // Adds src attribute to the audio element.
      audio.src = myURL;

      if (playListItems[i].childNodes[0].classList.contains("fa-pause")) {
        setPlayIcon(audioItem);
      }
      console.log(playListItems[i].childNodes[0]);
    }
  }
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
