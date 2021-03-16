// TODO
/* 
v0.2
--> MAIN GOALS: 
- able to select audio file(s) in folder and load them into playlist.
- playlist list artist name, song name, and length
--------------------------------------------------
--> TODO:
- Display audio file names.
- Place audio files in a clean format.
- Use custom play / pause bottons for each audio file.
- Add delete functionality for playlist.
- Set audio file limit to 10 files.
*/

let fileInput = document.getElementById("fileInput");
let myfiles = fileInput.files;
let playList = document.querySelector(".playlist");
let playListFiles = [];

//event listeners
fileInput.addEventListener("change", addFiles);

function addFiles() {
	// takes files from FileList (input files) and places them into playListFiles[].
	playListFiles.push.apply(playListFiles, myfiles);

	for (var i = 0; i < myfiles.length; i++) {
		// creates a new li element and an audio element inside of that li
		let newSong = document.createElement("li");
		let newSongFile = document.createElement("audio");

		// works with blobs
		let myURL = URL.createObjectURL(myfiles[i]);

		// Clean up the URL Object after we are done with it
		newSongFile.addEventListener("load", () => {
			URL.revokeObjectURL(myURL);
		});

		// Places name attribute inside audio tags, but doesn't render to page.
		// Figure out how to display file names in the browser. Maybe wrap names in a tag??
		newSongFile.innerHTML = playListFiles[i].name;

		//appends elements inside playlist.
		playList.appendChild(newSong);
		newSong.appendChild(newSongFile);

		//adds src and control attributes to the audio elements.
		newSongFile.controls = "true";
		newSongFile.src = myURL;
	}
}
console.log(playListFiles);
