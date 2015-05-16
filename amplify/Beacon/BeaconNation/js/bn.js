/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Draw the map
	drawMap();

	// List the customers
	loadCustomerList();

});

/*
	Helper function to load the map.
	TODO - dynamically look up the Beacon states
*/
function drawMap() {

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
		    'WA': {fill: '#4cbbd3'}
	  	} 
    }); 
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
	Show customer details
*/
function getDetails(state, dist) {

	highlightState(state);

	var details = "<ul class='list-unstyled'>";
	details += "<li><b>"
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
	details += "<li>"
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\'>";
	details += CUSTOMERS[state][dist]['url'];
	details += "</a>"
	details += "</li>"
	details += "</ul>"
	document.getElementById("details").innerHTML = details;


/*
			TODO:
			logo for each district/school
			testing windows
			a positive quote from someone if i have it
			the school/district motto
			if Beacon or just Assmt Studio
			show data if i have it or else don't, e.g. num interims
			make the map light up
			get a county map
*/
}

function getStateDetails(state) {
	var details = "<ul class='list-unstyled'>";

	for (var dist in CUSTOMERS[state]) {
		details += "<li><b>"
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
		details += "<li>"
		details += "<a href=\'http\://";
		details += CUSTOMERS[state][dist]['url'];
		details += "\'>";
		details += CUSTOMERS[state][dist]['url'];
		details += "</a>"
		details += "<br><br></li>"
	}

	details += "</ul>"
	document.getElementById("details").innerHTML = details;

}

/***************************

  EVENTS

 ***************************/

/*
	Click a state event. Show all customers in that state.
*/
$('#map').usmap({
  click: function(event, data) {
    getStateDetails(data.name);
  }
});




