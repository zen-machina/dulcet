// TODO
/* 
v0.1
- able to select audio file(s) in folder and load them into playlist.
- playlist list artist name, song name, and length
*/

// function selectFiles(e) {
// 	var files = e.target.files; // FileList object

// 	// files is a FileList of File objects. List some properties.
// 	var output = [];
// 	for (var i = 0, f; (f = files[i]); i++) {
// 		output.push("<li><strong>", escape(f.name), "</strong> </li>");
// 	}
// 	document.getElementById("songlist").innerHTML =
// 		"<ul>" + output.join("") + "</ul>";

// 	console.log(output[i]);
// }

let fileInput = document.getElementById("fileInput");
let playList = document.querySelector(".playlist02");
let playListFiles = [];

//event listeners
fileInput.addEventListener("change", addFiles);

function addFiles(e) {
	playListFiles = e.target.files;
	var output = [];

	for (var i = 0, f; (f = playListFiles[i]); i++) {
		output.push("<li>", f.name, "</li>");
	}
	playList.innerHTML = "<ul>" + output.join("") + "</ul>";
	console.log(playListFiles);
}

//displays files in output section in browser.
// function fileOutput(e) {
// 	var files = e.target.files; // FileList object

// 	// files is a FileList of File objects. List some properties.
// 	var output = [];
// 	for (var i = 0, f; (f = files[i]); i++) {
// 		output.push("<li><strong>", f.name, "</strong></li>");
// 	}

// 	document.getElementById("playlist").innerHTML =
// 		"<ul>" + output.join("") + "</ul>";
// 	//file test
// 	console.log(files[0]);
// }

// document
// 	.getElementById("fileInput")
// 	.addEventListener("change", fileOutput, false);
