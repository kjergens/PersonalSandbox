/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Draw the map
  drawMap(); 

   // List the customers
	loadCustomerList();

});

function drawMap() {

	var stateSpecificStyleText ="";

	for (var state in CUSTOMERS) {
		stateSpecificStyleText += state + ": {fill: '#4cbbd3'},"
	}
	console.log(stateSpecificStyleText);

	// Draw the map
    $('#map').usmap({
    	stateStyles: {fill: 'white'},
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
		list += "<h5>" + state + "</h5>"
		list += "<ul class='list-unstyled'>"
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
	
	var details = "<ul class='list-unstyled'>";
	details += getCustomerDetails(state, dist);
	details += "</ul>";
	
	document.getElementById("details").innerHTML = details;
}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	highlightState(state);

	document.getElementById("details_header").innerHTML = "Customers in " + state;

	var count = 0;
	var details = "<ul class='list-unstyled customer_details'>";
	for (var dist in CUSTOMERS[state]) {
		count++;
		details += getCustomerDetails(state, dist);
		if (count % 3 === 0) {
			details += "</ul><ul class='list-unstyled customer_details'>"
		}
	}
	details += "</ul>"
	document.getElementById("details").innerHTML = details;	
}

/* 
   Helper function to return details for one customer

			TODO:
			logo for each district/school
			testing windows
			a positive quote from someone if i have it
			the school/district motto
			x if Beacon or just Assmt Studio
			show data if i have it or else don't, e.g. num interims
			x make the map light up
			get a county map
 */
function getCustomerDetails(state, dist) {
	var details = "";
	details += "<li><ul class=\'list-unstyled\'><li><img src=\'img\\" + CUSTOMERS[state][dist]['logo'] + "\' width=\"50px\" height=\"50px\"><b>"
	details += CUSTOMERS[state][dist]['name'];
	details += "</b></li>"
	details += "<li>"
	details += CUSTOMERS[state][dist]['app'];
	details += "</li>"
	details += "<li>"
	details += CUSTOMERS[state][dist]['num_schools'];
	details += " school(s)"
	details += "</li>"
	details += "<li>"
	details += "Grades "
	details += CUSTOMERS[state][dist]['grades'];
	details += "</li>"
	details += "<li><b>"
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += CUSTOMERS[state][dist]['url'];
	details += "</a></b>";
	details += "<br><br></li><ul></li>";

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


$('#map').on('usmap<mouseout>', function(event, data) {
  // Output the abbreviation of the state name to the console
  console.log(data.name);
});