/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Draw the map
  drawMap(); 

   // Load the customer director
	loadDirectory();

	// List details for all customers
	loadAllCustomers();

});

function drawMap() {

	var fill = '#4cbbd3';
	var strokeColor = '#1b356c'; //#0645AD';
	var strokeWidth = 4;
	var stateHoverStyles = '#e9e9e9';
	var stateSpecificHoverFill = '#b7e3ed';

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
    	showLabels: false,
    	stateSpecificStyles: {
		    'AZ': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'CA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DC': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DE': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'IN': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'KY': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NC': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NY': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'TN': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'VA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'WA': {'fill': fill, 'stroke':strokeColor, 'stroke-width':strokeWidth},
	  	}, 
	  	stateHoverStyles: {fill: stateHoverStyles},
	  	stateSpecificHoverStyles: {
		    'AZ': {'fill': stateSpecificHoverFill},
		    'CA': {'fill': stateSpecificHoverFill},
		    'DC': {'fill': stateSpecificHoverFill},
		    'DE': {'fill': stateSpecificHoverFill},
		    'IN': {'fill': stateSpecificHoverFill},
		    'KY': {'fill': stateSpecificHoverFill},
		    'NC': {'fill': stateSpecificHoverFill},
		    'NY': {'fill': stateSpecificHoverFill},
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

	highlightState(state);
	document.getElementById("details_header").innerHTML = "";	
	document.getElementById("details_container").innerHTML = getCustomerDetails(state, dist);
	hideDir();
}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	if (CUSTOMERS[state]) {
		var details = ""; 
		var count = 0;
		highlightState(state);
		
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
			count++;
		}

		document.getElementById("details_header").innerHTML = count + " Customers in " + state;
		document.getElementById("details_container").innerHTML = details;	
	}
	
}

/*
	Get all customers.
*/
function loadAllCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
		}
	}
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
	details += "<img src=\'img\\" + CUSTOMERS[state][dist]['logo'] + "\' height=\"40px\">"
	details += "<b>" + CUSTOMERS[state][dist]['name'] + "</b><br>";
	details += CUSTOMERS[state][dist]['county'] + " County, " + state  + "<br>";
	details += "<i style=\'clear:both\' class=\'line\'></i>"
	details += "<div class=\'motto\'>" + CUSTOMERS[state][dist]['motto'] + "</div>";
	details += "<b>" +  CUSTOMERS[state][dist]['app'] + "</b>";
	details += "<br>"
	details += CUSTOMERS[state][dist]['num_schools'] + " schools<br>";
	details += CUSTOMERS[state][dist]['num_stu'] + " students<br>";
	details += "Grades "
	details += CUSTOMERS[state][dist]['grades'];
	details += "<br>"
	details += CUSTOMERS[state][dist]['consortia'];
	details += "<br>"
	details += "<b>"
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += CUSTOMERS[state][dist]['url'];
	details += "</a></b>";
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

