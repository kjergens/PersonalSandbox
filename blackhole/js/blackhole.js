var peek = false;
var spaces = 0;
var entry = "";

/*
On load, put the text editor in focus and load previous entries.
*/
window.onload = function () {
	document.getElementById('text_editor').focus();

	var d = new Date();
	writeToFile("\'}, \'" + d + "\' : { entry: \'");
	readEntries();
}

/*
	Show/hide Peek button
*/
var peekToggle = function () {
	var p = document.getElementById('peek-btn');

	if (!peek) { 
		peek = true; 
		p.className = 'btn active-btn';
		document.getElementById('saved_text').innerHTML = entry;

	}
		else { 
			peek = false; 
			p.className = 'btn';
			document.getElementById('saved_text').innerHTML = "";
	}
}


/*
	?
*/
function getChar(event) {
	var c = null; 
  if (event.which == null) {
    c = String.fromCharCode(event.keyCode) // IE
  } else if (event.which!=0 && event.charCode!=0) {
    c =  String.fromCharCode(event.which)   // the rest
  } 

	entry += c; 
}



/*
	Save text.
*/
var savedata = function (event) {

	txt = document.getElementById('text_editor');

	if (peek) {
			document.getElementById('saved_text').innerHTML = entry;
	}

	if (event.keyCode === 32  ||   // space
		  //event.keyCode === 190 ||   // period
		  //event.keyCode === 191 ||   // question
		  //event.keyCode === 49  ||   // exclamation
		  event.keyCode === 13) {    // newline

		/*	if (event.keyCode === 32) {
				spaces++;
				if (spaces % 2 === 1) {
					return 0;
				}
			}*/
		  
			writeToFile(txt.value);
			txt.value = "";

		}

	}

/*
	Read the entries stored in the file. 
*/
function readEntries() {
	var xmlhttp = new XMLHttpRequest();
	var url = "js/entry.json";

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        displayEntries(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

/*
  Print the entries
*/
function displayEntries(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += arr[i]['date'] + ": " + arr[i]['entry'] + "<br><br>";
    }
    document.getElementById("saved_text").innerHTML = arr;
}

/*
  Store all entries
*/
var writeToFile = function(entry) {
	var xmlhttp;

	// code for IE7+, Firefox, Chrome, Opera, Safari
	if (window.XMLHttpRequest) {
	 xmlhttp = new XMLHttpRequest(); 
	}
	else { // code for IE6, IE5
	  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("POST","savedata.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("entry=" + entry);
}
