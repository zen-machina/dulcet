// TODO
/* 
v0.1
- able to select audio file(s) in folder and load them into playlist.
- playlist list artist name, song name, and length
*/

// Takes selected input files and puts them in a list called files.
// Then iterates and alerts each file name that was selected.
//

function selectFiles(e) {
	var files = e.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; (f = files[i]); i++) {
		output.push("<li><strong>", escape(f.name), "</strong> </li>");
	}
	document.getElementById("list").innerHTML =
		"<ul>" + output.join("") + "</ul>";
}

document
	.getElementById("fileSelection")
	.addEventListener("change", selectFiles, false);
