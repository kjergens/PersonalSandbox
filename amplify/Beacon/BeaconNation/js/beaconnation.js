/*
	Initial load of map and directory.
*/
$(document).ready(function() {

	// Alphabetize customers
	alphabetizeCusts();

	// Load the customer directory menu
	loadDirectory();

	// Draw the map
  drawMap(); 

	// List detail cards for all customers
	loadAllCustomers();
});


/**********************************

  Directory menu

***********************************/

/*
	Load directory.
*/
function loadDirectory() {
	var list= "<ul class='list-unstyled' style='padding-left:20px'>";
	for (var key = 0; key < ALPHACUSTS.length; key ++) {
	    	list += "<li>";
	    	list += "<a href=\'#\'";
	    	list += " onclick=\"getDetails(\'"; 
	    	list += ALPHACUSTS[key]['state'] + "\', \'" + ALPHACUSTS[key]['dist'] + "\')\">"; 
	    	list += ALPHACUSTS[key]['name'];
	    	list += ", " + ALPHACUSTS[key]['state'];
	    	list += "</a></li>";
	}
  list += "</ul>";
	document.getElementById("dir").innerHTML = list;
}

/*
 * Alphabetize the customers
*/
function alphabetizeCusts() {
    var key, state, dist, a = [];

    // put all the district names in an array. 
    for (state in CUSTOMERS) {
    	for (dist in CUSTOMERS[state]) {
           a.push(CUSTOMERS[state][dist]);
      }
    }

    // Sort district names
    a.sort(function(x,y) {
    	if (x.name < y.name) 
    		return -1;
    	if (x.name > y.name) 
    		return 1
    	return 0
    });

    // Put into a full customer object
    for (key = 0; key < a.length; key++) {
        ALPHACUSTS.push(CUSTOMERS[a[key]['state']][a[key]['dist']]);
    }
}


/*
 * Toggle the visibility of the directory
*/
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
 * Show the directory
*/
function showDir() {
	document.getElementById("dir").className = "show";
}

/*
 * Hide the directory
*/
function hideDir() {
	document.getElementById("dir").className = "hide";
}



/**********************************

  Map

***********************************/

function drawMap() {

	var fill = '#f37321'; //#4cbbd3';
	var inactiveFill = '#e9e9e9';
	var strokeColor =  '#984513'; //#c25c1a'; //#1b356c'; //#0645AD';
	var strokeWidth = 5;
	var stateHoverStyles = '#e9e9e9'; //#f8f8f8';
	var stateSpecificHoverFill =  '#fed5bc';//#feab79'; //#f7ab79'; //'#b7e3ed';
	var stateSpecificLabelTextStyles = '#b15017';

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
			stateHoverAnimation: 250,
    	stateStyles: {fill: inactiveFill},
    	labelBackingStyles: {fill: inactiveFill},
    	labelBackingHoverStyles: {'fill': stateHoverStyles},
    	showLabels: true,
    	labelRadius: 2,
    	labelTextStyles: {'stroke': '#888', 'font-size':'10px', 'font-weight':'0'},
    	stateSpecificLabelBackingStyles: {
    		'CT':{'fill': '#fe8f4d'},
    		'DC':{'fill': '#fe8f4d'},
    		'DE':{'fill': '#fe8f4d'}
    	},
    	stateSpecificLabelBackingHoverStyles: {
    		'CT':{'fill': stateSpecificHoverFill},
    		'DC':{'fill': stateSpecificHoverFill},
    		'DE':{'fill': stateSpecificHoverFill}
    	},
    	stateSpecificLabelTextStyles: {
				'CT':{'stroke': stateSpecificLabelTextStyles},
    		'DC':{'stroke': stateSpecificLabelTextStyles},
    		'DE':{'stroke': stateSpecificLabelTextStyles}
    	},
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
}


/**********************************

  Load customer detail cards

***********************************/

/*
	Get all customers.
*/
function loadAllCustomers() {

  clearHighlights();
  hideDir();

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
			count ++;
	}
	document.getElementById("details_header").innerHTML = count + " customers total";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToTop();
}


/*
	Get Beacon customers.
*/
function loadBeaconCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] === 'Beacon') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("beacon_btn").className += " selected";
	document.getElementById("details_header").innerHTML =  count + " Beacon customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}

/*
	Get Assessment Studio only customers.
*/
function loadASCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] ==='Assessment Studio only') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("as_btn").className += " selected";
	document.getElementById("details_header").innerHTML = count + " Assessment Studio only customers" ;
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}

/*
	Get OIB customers.
*/
function loadOIBCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] != "Beacon" && ALPHACUSTS[i]['app'] != "Assessment Studio only") {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML =  count + " Open Item Bank customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}

/*
	Get Customized customers.
*/
function loadCustomizedCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] != "Beacon" && ALPHACUSTS[i]['app'] != "Assessment Studio only") {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("custom_btn").className += " selected";
	document.getElementById("details_header").innerHTML = count + " customized customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}

/*
	Get Smarter Balanced customers.
*/
function loadSBACCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['consortia'] === 'Smarter Balanced') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML = count + " Smarter Balanced customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}

/*
	Get PARCC customers.
*/
function loadPARCCCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['consortia'] === 'PARCC') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML = count + " PARCC customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();
}


/*
	Get Non-Consortia customers.
*/
function loadNonConsortiaCustomers() {

	clearHighlights();
	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['consortia'] != 'Smarter Balanced' && ALPHACUSTS[i]['consortia'] != 'PARCC') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML =  count + " non-consortia customers";
	document.getElementById("details_container").innerHTML = details;	

	//scrollToMainArea();

}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	highlightState(state);

	var details = ""; 
	var count = 0;

	if (CUSTOMERS[state]) {
		
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
			count++;
		}

		document.getElementById("details_header").innerHTML = count + " customers in " + state;
		document.getElementById("details_container").innerHTML = details;	

	}

	

	//scrollToMainArea();
}


/*
	Get a single customer
*/
function getDetails(state, dist) {

	highlightState(state);
	highlightButtons(state, dist);
	document.getElementById("details_header").innerHTML = CUSTOMERS[state][dist]['name'] + " - " + CUSTOMERS[state][dist]['num_stu'] + " students"  ;	
	document.getElementById("details_container").innerHTML = getCustomerDetails(state, dist);
	hideDir(); 

  //scrollToMainArea();



}

/**********************************

  Customer detail cards

***********************************/


/* 
   Helper function to return details for one customer

			TODO:
			testing windows
			a positive quote from someone if i have it
			get a county map
 */
function getCustomerDetails(state, dist) {
	var details = "<div class=\"cust_details\">";
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += "<img src=\'img\/" + CUSTOMERS[state][dist]['logo'] + "\'></a>";
	details += "<b>";
	details += "<a href=\'http\://";
	details += CUSTOMERS[state][dist]['url'];
	details += "\' target=\"_blank\">";
	details += CUSTOMERS[state][dist]['name'] + "</b></a><br> ";
	details += CUSTOMERS[state][dist]['county'] + " County, " + state  + "<br>";
	details += "<div style=\'clear:both\' class=\'motto\'>" + CUSTOMERS[state][dist]['motto'] + "</div>";
	details += "<i class=\'line\'></i>"
	details += "<b>" +  CUSTOMERS[state][dist]['app'] + "</b>";
	details += "<br>"
	//details += CUSTOMERS[state][dist]['num_schools'] + " schools<br>";
	details += CUSTOMERS[state][dist]['num_stu'] + " students<br>";
	details += CUSTOMERS[state][dist]['consortia'];
	details += "<br>"
	details += CUSTOMERS[state][dist]['grades'];
	details += "</div>";

	return details;
}

/******************************************************************
*
*   Helper functions
*
*******************************************************************/

function scrollToTop() {
	//$('html, body').animate({
  //      scrollTop: $("#main_area").offset().top
  //  }, 4000);
	$('html,body').animate({scrollTop: 1}, 100);
}

function scrollToMainArea() {
	//$('html, body').animate({
  //      scrollTop: $("#main_area").offset().top
  //  }, 4000);
	$('html,body').animate({scrollTop: 380}, 600);
}

/*
	Highlight only one state
*/
function highlightState(state) {

	clearHighlights();

	// Highlight the selected states
  $('#map').usmap('trigger', state, 'mouseover');
}

// highlight buttons
function highlightButtons(state, dist) {

	// product buttons
  if (CUSTOMERS[state][dist]['app'] === 'Beacon') {
  	document.getElementById("beacon_btn").className += " selected";
  }
  else if (CUSTOMERS[state][dist]['app'] === 'Assessment Studio only') {
  	document.getElementById("as_btn").className += " selected";
  }
  else {
  	document.getElementById("custom_btn").className += " selected";
  }

  // consortia buttons
  if (CUSTOMERS[state][dist]['consortia'] === 'Smarter Balanced') {
  	document.getElementById("sbac_btn").className += " selected";
  }
  else if (CUSTOMERS[state][dist]['consortia'] === 'PARCC') {
  	document.getElementById("parcc_btn").className += " selected";
  }
  else {
  	document.getElementById("nonconsortia_btn").className += " selected";
  }
}


/// Undo existing highlights
function clearHighlights() {
		// map
 		for (var s in CUSTOMERS) {
   		 $('#map').usmap('trigger', s, 'mouseout');

   	// buttons
   	document.getElementById("beacon_btn").className = "btn filter-btn product-btn";
   	document.getElementById("as_btn").className = "btn filter-btn product-btn";
   	document.getElementById("custom_btn").className = "btn filter-btn product-btn";
   	document.getElementById("sbac_btn").className = "btn filter-btn consortia-btn";
   	document.getElementById("parcc_btn").className = "btn filter-btn consortia-btn";
   	document.getElementById("nonconsortia_btn").className = "btn filter-btn consortia-btn";
  }
}

