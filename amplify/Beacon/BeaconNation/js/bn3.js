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

	var stateSpecificStyleText ="";

	for (var state in CUSTOMERS) {
		stateSpecificStyleText += state + ": {fill: '#4cbbd3'},"
	}
	console.log(stateSpecificStyleText);

	var strokeColor = '#0645AD';
	var strokeWidth = 4;

	// Draw the map
    $('#map').usmap({
    	stateStyles: {fill: '#e9e9e9'},
    	showLabels: false,
    	stateSpecificStyles: {
		    'AZ': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'CA': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DC': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'DE': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'IL': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'IN': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'KY': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NC': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'NY': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'TN': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'VA': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
		    'WA': {'fill': '#4cbbd3', 'stroke':strokeColor, 'stroke-width':strokeWidth},
	  	}, 
	  	stateHoverStyles: {fill: '#e9e9e9'},
	  	stateSpecificHoverStyles: {
		    'AZ': {'fill': '#b7e3ed'},
		    'CA': {'fill': '#b7e3ed'},
		    'DC': {'fill': '#b7e3ed'},
		    'DE': {'fill': '#b7e3ed'},
		    'IL': {'fill': '#b7e3ed'},
		    'IN': {'fill': '#b7e3ed'},
		    'KY': {'fill': '#b7e3ed'},
		    'NC': {'fill': '#b7e3ed'},
		    'NY': {'fill': '#b7e3ed'},
		    'TN': {'fill': '#b7e3ed'},
		    'VA': {'fill': '#b7e3ed'},
		    'WA': {'fill': '#b7e3ed'},
	  	}, 
	  	click: function(click, state) {
    		getStateDetails(state.name); 
    }});
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
	details += "<b>" + CUSTOMERS[state][dist]['name'] + "</b>";
	details += "<br style=\'clear:both\'>"
	details += CUSTOMERS[state][dist]['app'];
	details += "<br>"
	details += CUSTOMERS[state][dist]['num_schools'];
	details += " school(s)"
	details += "<br>"
	details += "Grades "
	details += CUSTOMERS[state][dist]['grades'];
	details += "<br>"
	details += "<b>"
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += CUSTOMERS[state][dist]['url'];
	details += "</a></b>";
	//details += "<br><br><i>" + CUSTOMERS[state][dist]['motto'] + "</i><br>";
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

