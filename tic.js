$(document).ready(function() {

	var isPlayerOneTurn = true;
	var turnsTaken = 0;
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var playerOneTurnsRemaining = 5;
	var playerTwoTurnsRemaining = 4;


	/*********************
	 * Blank square on-click action
	******************** */
	$(".blank").click(function(){

		// If it still has "blank" class it's not filled yet.
		// It doesn't automatically unbind when "blank" class is removed.
		if ($(this).hasClass("blank") ) {

			// Fill in square
			var color = "";

			if (isPlayerOneTurn) {
				color = "pink";
			}
			else {
				color = "green";
			}

			$(this).removeClass("blank");
			$(this).addClass(color);

			// Only check for winner after 5 turns. 
			//   Game can't be won in fewer.
			turnsTaken++;
			if (turnsTaken >= 5) {
				if (checkWinner(color)) {

					var winner = "";
					
					if (isPlayerOneTurn) {
						playerOneScore++;
						winner = "Player One";
					}
					else {
						playerTwoScore++;
						winner = "Player Two";
					}

					$("#mininotice").html("Winner:");
					$("#summary").html(winner);
					$("#numturns").html(playerOneScore +  " " + playerTwoScore);

					reset();
				};
			}

			// Switch turns
			isPlayerOneTurn = !isPlayerOneTurn;
		}
	});

	/*********************
	 * Reset board.
	 *********************/
	function reset() {
		turnsTaken=0;
		var currentPlayer = "";

		if (isPlayerOneTurn) {
			currentPlayer = "Player One";
		}
		else {
			currentPlayer = "Player Two";
		}

		$(".square").removeClass("pink");
		$(".square").removeClass("green");
		$(".square").addClass("blank");

		//$("#summary").html(currentPlayer + "\'s turn.");
		
	}

	/*********************
	 * Check winner.
	 *********************/
	function checkWinner(color) {

		if ( ($("#tl").hasClass(color) && 
			$("#tm").hasClass(color) && 
			$("#tr").hasClass(color)) 
			||
			($("#ml").hasClass(color) && 
			$("#mm").hasClass(color) && 
			$("#mr").hasClass(color))
			|| 
			($("#bl").hasClass(color) && 
			$("#bm").hasClass(color) && 
			$("#br").hasClass(color)) 
			||
			($("#tl").hasClass(color) && 
			$("#ml").hasClass(color) && 
			$("#bl").hasClass(color)) 
			||
			($("#tm").hasClass(color) && 
			$("#mm").hasClass(color) && 
			$("#bm").hasClass(color)) 
			||
			($("#tl").hasClass(color) && 
			$("#ml").hasClass(color) && 
			$("#bl").hasClass(color)) 
			||
			($("#tr").hasClass(color) && 
			$("#mm").hasClass(color) && 
			$("#bl").hasClass(color)) 
			||
			($("#tl").hasClass(color) && 
			$("#mm").hasClass(color) && 
			$("#br").hasClass(color)) 
			)
		{
			return true;
		}	
		else {
			return false;
		}		
	};

	/*********************
 	* Wire Reset button event
 	*********************/
	$("#reset").click(function(){
		reset();
	});
});