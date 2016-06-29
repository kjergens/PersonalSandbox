$(document).ready(function() {

	var isPlayerOneTurn = true;
	var turnsTaken = 0;
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var nextPlayer = "";


	/*********************
	 * Blank square on-click action
	******************** */
	$(".blank").click(function(){

		// If it still has "blank" class it's not filled yet.
		// It doesn't automatically unbind when "blank" class is removed.
		if ($(this).hasClass("blank") ) {

			// Fill in square
			var currentPlayer = "";

			if (isPlayerOneTurn) {
				currentPlayer = "player1";
				nextPlayer = "player2";
			}
			else {
				currentPlayer = "player2";
				nextPlayer = "player1";
			}

			$(this).removeClass("blank");
			$(this).addClass(currentPlayer);

			// Only check for winner after 5 turns. 
			//   Game can't be won in fewer.
			turnsTaken++;
			if (turnsTaken >= 5) {
				if (checkWinner(currentPlayer)) {

					var winner = "";
					
					if (isPlayerOneTurn) {
						playerOneScore++;
						winner = "Player One";
					}
					else {
						playerTwoScore++;
						winner = "Player Two";
					}
					
					$("#player1").html(playerOneScore);
					$("#player2").html(playerTwoScore);

					reset();

					if (!$("#reset").hasClass("active")) {
						$("#reset").addClass("active");
					}
				}
				else if (turnsTaken==9) {
					reset();
				} 
			}

			// Switch turns
			isPlayerOneTurn = !isPlayerOneTurn;
			$("#" + currentPlayer).removeClass("focus");
			$("#" + nextPlayer).addClass("focus");
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

		$(".square").removeClass("player1");
		$(".square").removeClass("player2");
		$(".square").addClass("blank");
		
	}

	/*********************
	 * Check winner.
	 *********************/
	function checkWinner(currentPlayer) {

		if ( ($("#tl").hasClass(currentPlayer) && 
			$("#tm").hasClass(currentPlayer) && 
			$("#tr").hasClass(currentPlayer)) 
			||
			($("#ml").hasClass(currentPlayer) && 
			$("#mm").hasClass(currentPlayer) && 
			$("#mr").hasClass(currentPlayer))
			|| 
			($("#bl").hasClass(currentPlayer) && 
			$("#bm").hasClass(currentPlayer) && 
			$("#br").hasClass(currentPlayer)) 
			||
			($("#tl").hasClass(currentPlayer) && 
			$("#ml").hasClass(currentPlayer) && 
			$("#bl").hasClass(currentPlayer)) 
			||
			($("#tm").hasClass(currentPlayer) && 
			$("#mm").hasClass(currentPlayer) && 
			$("#bm").hasClass(currentPlayer)) 
			||
			($("#tr").hasClass(currentPlayer) && 
			$("#mr").hasClass(currentPlayer) && 
			$("#br").hasClass(currentPlayer)) 
			||
			($("#tr").hasClass(currentPlayer) && 
			$("#mm").hasClass(currentPlayer) && 
			$("#bl").hasClass(currentPlayer)) 
			||
			($("#tl").hasClass(currentPlayer) && 
			$("#mm").hasClass(currentPlayer) && 
			$("#br").hasClass(currentPlayer)) 
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
		playerOneScore = 0;
	 	playerTwoScore = 0;
		$("#player1").html(playerOneScore);
		$("#player2").html(playerTwoScore);
		$("#reset").removeClass("active");
	});
});