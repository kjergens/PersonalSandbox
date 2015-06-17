/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Draw the map
  drawMap(); 

   // Load the customer directory
	loadDirectory();

	// List details for all customers
	loadAllCustomers();

});

function drawMap() {

	var fill = '#f37321'; //#4cbbd3';
	var strokeColor =  '#c25c1a'; //#1b356c'; //#0645AD';
	var strokeWidth = 4;
	var stateHoverStyles = '#e9e9e9';
	var stateSpecificHoverFill = '#f7ab79'; //'#b7e3ed';

/*
	Dynamically figure out Beacon states.
	TODO: Figure out how to plug this in.
*/
	var stateSpecificStyleText ="";

	for (var state in CUSTOMERS) {
		stateSpecificStyleText += state + ": {fill: " + fill + "},"
	}
	console.log(stateSpecificStyleText);

	/*
	 Draw the map
	*/
	$('#map').usmap({
    	stateStyles: {fill: '#e9e9e9'},
    	showLabels: true,
    	stateSpecificStyles: {
    		'AL': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
    		'AR': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'AZ': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'CA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'CT': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DC': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DE': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'GA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'IL': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'IN': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'MI': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NC': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NY': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'SC': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'TN': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'VA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'WA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
	  	}, 
	  	stateHoverStyles: {fill: stateHoverStyles},
	  	stateSpecificHoverStyles: {
	  		'AL': {'fill': stateSpecificHoverFill},
	  		'AR': {'fill': stateSpecificHoverFill},
		    'AZ': {'fill': stateSpecificHoverFill},
		    'CA': {'fill': stateSpecificHoverFill},
		    'CT': {'fill': stateSpecificHoverFill},
		    'DC': {'fill': stateSpecificHoverFill},
		    'DE': {'fill': stateSpecificHoverFill},
		    'GA': {'fill': stateSpecificHoverFill},
		    'IL': {'fill': stateSpecificHoverFill},
		    'IN': {'fill': stateSpecificHoverFill},
		    'MI': {'fill': stateSpecificHoverFill},
		    'NC': {'fill': stateSpecificHoverFill},
		    'NY': {'fill': stateSpecificHoverFill},
		    'SC': {'fill': stateSpecificHoverFill},
		    'TN': {'fill': stateSpecificHoverFill},
		    'VA': {'fill': stateSpecificHoverFill},
		    'WA': {'fill': stateSpecificHoverFill},
	  	}, 
	  	click: function(click, state) {
    		getStateDetails(state.name); 
    }});

		drawLabels();	
}

/*
	Helper function to draw labels.
*/
function drawLabels() {
	var labels = "";
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			labels += '<div class="dot" style="position:relative;left:-50%;top:0%">'
				+ '<a href="#" onclick=getDetails(' 
	    	+ '"' + state + '"' + ',"' + dist + '"'
	    	+ ')>'
				+ CUSTOMERS[state][dist]['name'] + "</a></div>"
		}
	}
	document.getElementById("map_overlay").innerHTML = labels;	
}

/*
	Helper function to load directory.
*/
function loadDirectory() {
	var list="";
	for (var state in CUSTOMERS) {
		list += "<b>" + state + "</b>"
		list += "<ul class='list-unstyled' style='padding-left:20px'>"
		for (var dist in CUSTOMERS[state]) {
	    	list += "<li><a href=\'#\' onclick=getDetails(" 
	    	+ "\'" + state + "\'" + ",\'" + dist + "\'" 
	    	+ ")>" 
	    	+ CUSTOMERS[state][dist]['name'] + "</a></li>"
	  }
	  list += "</ul>"
	}
	document.getElementById("dir").innerHTML = list;
}


/*
	Show customer details
*/
function getDetails(state, dist) {

  hideDir();
	highlightState(state);
	document.getElementById("details_header").innerHTML = "1 customer selected";	
	document.getElementById("details_container").innerHTML = getCustomerDetails(state, dist);
	
}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	if (CUSTOMERS[state]) {
		var details = ""; 
		var count = 0;
		
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
			count++;
		}

		document.getElementById("details_header").innerHTML = count + " customers in " + state;
		document.getElementById("details_container").innerHTML = details;	
		highlightState(state);
	}
	
}

/*
	Get all customers.
*/
function loadAllCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
			count ++;
		}
	}
	document.getElementById("details_header").innerHTML = count + " customers";
	document.getElementById("details_container").innerHTML = details;	
}


/*
	Get all Beacon customers.
*/
function loadBeaconCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			if (CUSTOMERS[state][dist]['app'] === 'Beacon') {
				details += getCustomerDetails(state, dist);
				count ++;
			}
			
		}
	}
	document.getElementById("details_header").innerHTML = count + " Beacon customers";
	document.getElementById("details_container").innerHTML = details;	
}

/*
	Get Assessment Studio only customers.
*/
function loadASCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			if (CUSTOMERS[state][dist]['app'] === 'Assessment Studio only') {
				details += getCustomerDetails(state, dist);
				count ++;
			}
			
		}
	}
	document.getElementById("details_header").innerHTML = count + " Assessment Studio only customers";
	document.getElementById("details_container").innerHTML = details;	
}

/* 
   Helper function to return details for one customer

			TODO:
			x logo for each district/school
			testing windows
			a positive quote from someone if i have it
			x the school/district motto
			x if Beacon or just Assmt Studio
			show data if i have it or else don't, e.g. num interims
			x make the map light up
			get a county map
 */
function getCustomerDetails(state, dist) {
	var details = "<div class=\"cust_details\">";
	details += "<img src=\'img\/" + CUSTOMERS[state][dist]['logo'] + "\'>"
	details += "<b>";
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += CUSTOMERS[state][dist]['name'] + "</b></a><br> ";
	details += CUSTOMERS[state][dist]['county'] + " County, " + state  + "<br>";
	//details += CUSTOMERS[state][dist]['county'] + " County, " + state  + "<br>";
	details += "<div style=\'clear:both\' class=\'motto\'>" + CUSTOMERS[state][dist]['motto'] + "</div>";
	details += "<i class=\'line\'></i>"
	details += "<b>" +  CUSTOMERS[state][dist]['app'] + "</b>";
	details += "<br>"
	//details += CUSTOMERS[state][dist]['num_schools'] + " schools<br>";
	details += CUSTOMERS[state][dist]['num_stu'] + " students<br>";
	details += CUSTOMERS[state][dist]['grades'];
	details += "<br>"
	details += CUSTOMERS[state][dist]['consortia'];
	details += "</div>";

	return details;
}

/*
	Highlight only one state
*/
function highlightState(state) {

	// Undo existing highlights
 for (var s in CUSTOMERS) {
    $('#map').usmap('trigger', s, 'mouseout');
  }

	// Highlight the selected states
  $('#map').usmap('trigger', state, 'mouseover');
}



function toggleDir() {
	var m = document.getElementById("dir").className;
	if (m === "show") {
		document.getElementById("dir").className = "hide";
	}
	else {
		document.getElementById("dir").className = "show";
	}
}

/*
  Show the directory
*/
function showDir() {
	document.getElementById("dir").className = "show";
}

/*
  Hide the directory
*/
function hideDir() {
	document.getElementById("dir").className = "hide";
}

