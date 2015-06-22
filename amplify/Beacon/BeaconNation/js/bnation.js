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

var n = "{\"map\": {\"name\": \"usa_states\""
					   + ", \"defaultArea\": {"
						 + "\"attrs\" : {"
						 + "\"fill\" : \"#f4f4e8\""
						 + ", \"stroke\": \"#00a1fe\""
						 + "}}"
						 + ", \"attrsHover\" : {"
	 					 + "\"fill\": \"#f37321\""
	           + "},"
	           + "\"legend\": {"
	           + "\"plot\":["
	           + "{"
	           + " \"labelAttrs\":{"
	           + " \"fill\" : \"#888\""
	           + " }, \"titleAttrs\":{"
	           + " \"fill\" : \"#888\""
	           + " },"
	           + " \"cssClass\": \"population\","
	           + "						\"mode\": \"horizontal\","
	           + "						\"title\": \"Population\","
	           + "						\"marginBottomTitle\":5,"
	           + "						\"slices\": [{"
						 + "							\"size\":15,"
						 + "							\"legendSpecificAttrs\": {"
						 + "								\"fill\":\"#00a1fe\","
						 + "								\"stroke\":\"#888\","
						 + "								\"stroke-width\" : 2"
						 + "							},"
						 + "						\"label\": \"< 10 000\","
						 + "						\"max\": \"10000\""
						 + "						}, {"
						 + "						\"size\":30,"
						 + "						\"legendSpecificAttrs\": {"
						 + "							\"fill\":\"#00a1fe\","
						 + "							\"stroke\":\"#f4f4e8\","
						 + "							\"stroke-width\" : 2"
						 + "						},"
						 + "						\"label\": \"> 10 000 and < 100 000\","
						 + "						\"min\": \"10000\","
						 + "						\"max\": \"100000\""
						 + "						}, {"
						 + "						\"size\":50,"
						 + "						\"legendSpecificAttrs\": {"
						 + "							\"fill\":\"#00a1fe\","
						 + "							\"stroke\":\"#f4f4e8\","
						 + "							\"stroke-width\" : 2"
						 + "						},"
						 + "						\"label\": \"> 100 000\","
						 + "						\"min\": \"100000\"}]} "  // end of slice, end of plot
						 + "				, {"
				  	 + "           \"labelAttrs\":{"
						 + "                  \"fill\" : \"#888\""
						 + "              },"
						 + "              \"titleAttrs\":{"
						 + "                  \"fill\" : \"#888\""
						 + "              },"
					 	 + "					\"cssClass\": \"density\","
						 + "					\"mode\": \"horizontal\","
						 + "					\"title\": \"Density\","
						 + "					\"marginBottomTitle\":5,"
						 + "					\"slices\": [{"
						 + "						\"label\": \"< 50\","
						 + "						\"max\": \"50\","
						 + "						\"attrs\": {\"fill\": \"#fef500\"},"
						 + "						\"legendSpecificAttrs\": {\"r\": 25}"
						 + "						}," // end of slice
						 + "            {"
						 + "						\"label\": \"> 50 and < 500\","
						 + "						\"min\": \"50\","
						 + "						\"max\": \"500\","
						 + "						\"attrs\": {\"fill\": \"#fe6c00\"},"
						 + "						\"legendSpecificAttrs\": {\"r\": 25}"
						 + "					}," // end of slice
						 + "         {"
						 + "						\"label\": \"> 500\","
						 + "						\"min\": \"500\","
						 + "						\"attrs\": {\"fill\": \"#dc0000\"},"
						 + "						\"legendSpecificAttrs\": {\"r\": 25}"
						 + "						}]" // end of slice, end of slices
	           + "    }]}," // end of plot, end of legend
	           	+ "		\"plots\": {" 
						 + "			\"ny\" : {"
						 + "				\"latitude\": 40.717079,"
						 + "				\"longitude\": -74.00116,"
						 + "				\"tooltip\": {\"content\" : \"New York\"},"
						 + "                \"value\": [ 5000, 20]"
						 + "			}}" // end of ny, end of plots
             + "}}"; // end of map, end of n


var um = { map : {
			name : "usa_states"
            , defaultArea: {
				attrs : {
					fill : "#f4f4e8"
					, stroke: "#00a1fe"
				}
				, attrsHover : {
					fill: "#f37321"
				}
            }
		},
        legend: {
            plot: [
				{
                    labelAttrs:{
                        fill : "#888"
                    },
                    titleAttrs:{
                        fill : "#888"
                    },
					cssClass: 'population',
					mode: 'horizontal',
					title: "Population",
					marginBottomTitle:5,
					slices: [{
						size:15,
						legendSpecificAttrs: {
							fill:'#00a1fe',
							stroke:'#f4f4e8',
							"stroke-width" : 2
						},
						label: "< 10 000",
						max: "10000"
					}, {
						size:30,
						legendSpecificAttrs: {
							fill:'#00a1fe',
							stroke:'#f4f4e8',
							"stroke-width" : 2
						},
						label: "> 10 000 and < 100 000",
						min: "10000",
						max: "100000"
					}, {
						size:50,
						legendSpecificAttrs: {
							fill:'#00a1fe',
							stroke:'#f4f4e8',
							"stroke-width" : 2
						},
						label: "> 100 000",
						min: "100000"
					}]
				}
				, {
                   labelAttrs:{
                        fill : "#888"
                    },
                    titleAttrs:{
                        fill : "#888"
                    },
					cssClass: 'density',
					mode: "horizontal",
					title: "Density",
					marginBottomTitle:5,
					slices: [{
						label: "< 50",
						max: "50",
						attrs: {
							fill: "#fef500"
						},
						legendSpecificAttrs: {
							r: 25
						}
					}, {
						label: "> 50 and < 500",
						min: "50",
						max: "500",
						attrs: {
							fill: "#fe6c00"
						},
						legendSpecificAttrs: {
							r: 25
						}
					}, {
						label: "> 500",
						min: "500",
						attrs: {
							fill: "#dc0000"
						},
						legendSpecificAttrs: {
							r: 25
						}
					}]
				}
            ]
        },
		plots: {
			'ny' : {
				latitude: 40.717079,
				longitude: -74.00116,
				tooltip: {content : "New York"},
                value: [ 5000, 20]
			}
		},
		eventHandlers: {
			click: function (e, id, mapElem, textElem) { 
				alert("click");
			}
		}
};
		

  n = jQuery.trim(n);

  console.log(n);

  var obj = jQuery.parseJSON(n);

  console.log(obj);

  var t = JSON.stringify(um);
  var o2 = jQuery.parseJSON (t);

	$(".mapcontainer").mapael(o2);

}

/*
	Highlight only one state
*/
function highlightState(state) {

	// Undo existing highlights
 for (var s in CUSTOMERS) {
    $('.mapcontainer').trigger('mouseout', [s]);
  }

	// Highlight the selected states
  $('.mapcontainer').trigger('mouseover', [s]);
}



/**********************************

  Product filters

***********************************/
/*
	Get all Beacon customers.
*/
function loadBeaconCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] === 'Beacon') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
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
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] === 'Assessment Studio only') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML = count + " Assessment Studio (non-Beacon) customers";
	document.getElementById("details_container").innerHTML = details;	
}


/*
	Get OIB customers.
*/
function loadOIBCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			if (ALPHACUSTS[i]['app'] === 'OIB') {
				details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
				count ++;
			}		
	}
	document.getElementById("details_header").innerHTML = count + " Open Item Bank customers";
	document.getElementById("details_container").innerHTML = details;	
}




/**********************************

  Customer detail cards

***********************************/

/*
	Display all customers.
*/
function loadAllCustomers() {

	document.getElementById("details_header").innerHTML = "";

	var details = "";
	var count = 0;
	for (var i in ALPHACUSTS) {
			details += getCustomerDetails(ALPHACUSTS[i]['state'], ALPHACUSTS[i]['dist']);
			count ++;
	}
	document.getElementById("details_header").innerHTML = count + " customers total";
	document.getElementById("details_container").innerHTML = details;	
}


/* 
  Get all customers for one state.
*/
function getStateDetails(state) {

	//highlightState(state);

	var details = ""; 
	var count = 0;

	if (CUSTOMERS[state]) {
		
		for (var dist in CUSTOMERS[state]) {
			details += getCustomerDetails(state, dist);
			count++;
		}

	}

	document.getElementById("details_header").innerHTML = count + " customers in " + state;
	document.getElementById("details_container").innerHTML = details;	
}

/*
	Get a single customer
*/
function getDetails(state, dist) {

	highlightState(state);
	document.getElementById("details_header").innerHTML = "";	
	document.getElementById("details_container").innerHTML = getCustomerDetails(state, dist);
	hideDir();
}


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
	details += CUSTOMERS[state][dist]['grades'];
	details += "<br>"
	details += CUSTOMERS[state][dist]['consortia'];
	details += "</div>";

	return details;
}
