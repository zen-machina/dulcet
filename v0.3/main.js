// TODO
/* 
v0.3
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
let audio = document.getElementById("audioElem");
let audioItem = document.querySelector(".audioItem");
let currentAudio = null;

// let myfiles = fileInput.files;
let playListFiles = [];

//event listeners
fileInput.addEventListener("change", addFiles);
audio.addEventListener("click", audioPlayPause);

function addFiles() {
	// takes files from FileList (input files) and places them into playListFiles[].
	let myfiles = fileInput.files;

	// playListFiles.push.apply(playListFiles, myfiles);
	for (var i = 0; i < myfiles.length; i++) {
		// add if statement check to see if files <= 5.

		// creates a new li element and an a element inside of that li
		let newSong = document.createElement("li");
		let newSongFile = document.createElement("a");
		// works with blobs
		let myURL = URL.createObjectURL(myfiles[i]);
		// Clean up the URL Object after we are done with it
		newSongFile.addEventListener("load", () => {
			URL.revokeObjectURL(myURL);
		});

		newSongFile.addEventListener("click", audioPlayPause);
		// adds class of .audioItem to newSongFile.
		newSongFile.classList.add("audioItem");
		// adds new objectURL into newSongFile href.
		newSongFile.href = myURL;
		// adds playbutton and file name to each newSongFile.
		newSongFile.innerHTML = `<i class="fa fa-play-circle"></i>${myfiles[i].name}`;

		//appends elements inside playlist.
		playList.appendChild(newSong);
		newSong.appendChild(newSongFile);

		//adds src and control attributes to the audio element.
		audio.controls = "true";
		audio.src = myURL;
	}
	console.log(myfiles);
}

// Works for the most part.
//Bug: when I load more songs while I have a song playing,
// then click on new song to play, the pause botton stays on previous song.y
function audioPlayPause(e) {
	e.preventDefault();

	// checks to see if the clicked on song is currently loaded.
	let audioLoaded = this.getAttribute("href") === audio.getAttribute("src");

	//if#1
	if (audioLoaded && audio.paused) {
		console.log("if#1");
		currentAudio = this;
		setPauseIcon(currentAudio);
		audio.play();
		//elseif#2
	} else if (audioLoaded && !audio.paused) {
		console.log("elseif#2");
		currentAudio = this;
		setPlayIcon(currentAudio);
		audio.pause();
		//else#3
	} else {
		//else--if#4
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

// (!isCurrentAudio && !audio.paused)
function setPauseIcon(elem) {
	let icon = elem.querySelector("i");
	icon.classList.remove("fa-play-circle");
	icon.classList.add("fa-pause-circle");
}

function setPlayIcon(elem) {
	let icon = elem.querySelector("i");
	icon.classList.remove("fa-pause-circle");
	icon.classList.add("fa-play-circle");
}
