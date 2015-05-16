/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Draw the map
  drawMap(); 

   // Load the customer director
	loadCustomerList();

	// List details for all customers
	//getAllCustomers();

});

function drawMap() {

	var stateSpecificStyleText ="";

	for (var state in CUSTOMERS) {
		stateSpecificStyleText += state + ": {fill: '#4cbbd3'},"
	}
	console.log(stateSpecificStyleText);

	// Draw the map
    $('#map').usmap({
    	stateStyles: {fill: '#e9e9e9'},
    	showLabels: true,
    	stateSpecificStyles: {
		    'AZ': {fill: '#4cbbd3'},
		    'CA': {fill: '#4cbbd3'},
		    'DC': {fill: '#4cbbd3'},
		    'DE': {fill: '#4cbbd3'},
		    'IL': {fill: '#4cbbd3'},
		    'IN': {fill: '#4cbbd3'},
		    'KY': {fill: '#4cbbd3'},
		    'NC': {fill: '#4cbbd3'},
		    'NY': {fill: '#4cbbd3'},
		    'TN': {fill: '#4cbbd3'},
		    'VA': {fill: '#4cbbd3'},
		    'WA': {fill: '#4cbbd3'},
	  	}, 
	  	stateHoverStyles: {fill: '#b7e3ed'},
	  	click: function(click, state) {
    		getStateDetails(state.name); 
    }});
}

/*
	Helper function to load directory.
*/
function loadCustomerList() {
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
	document.getElementById("details").innerHTML = getCustomerDetails(state, dist);
	document.getElementById("dir").className = "hide";
}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	if (CUSTOMERS[state]) {
		var details = ""; 
		highlightState(state);
		document.getElementById("details_header").innerHTML = "Customers in " + state;
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
		}
		document.getElementById("details").innerHTML = details;	
	}
	else {
		getAllCustomers();
	}
	
}

/*
	Get all customers.
*/
function getAllCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	for (var state in CUSTOMERS) {
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
		}
	}
	document.getElementById("details").innerHTML = details;	
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
	details += "<img src=\'img\\" + CUSTOMERS[state][dist]['logo'] + "\' height=\"40px\"><b>"
	details += CUSTOMERS[state][dist]['name'];
	details += "</b><br>"
	details += "<i>" + CUSTOMERS[state][dist]['motto'] + "</i><br>";
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

