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
	function checkWinner(player) {

		if ( ($("#tl").hasClass(player) && 
			$("#tm").hasClass(player) && 
			$("#tr").hasClass(player)) 
			||
			($("#ml").hasClass(player) && 
			$("#mm").hasClass(player) && 
			$("#mr").hasClass(player))
			|| 
			($("#bl").hasClass(player) && 
			$("#bm").hasClass(player) && 
			$("#br").hasClass(player)) 
			||
			($("#tl").hasClass(player) && 
			$("#ml").hasClass(player) && 
			$("#bl").hasClass(player)) 
			||
			($("#tm").hasClass(player) && 
			$("#mm").hasClass(player) && 
			$("#bm").hasClass(player)) 
			||
			($("#tr").hasClass(player) && 
			$("#mr").hasClass(player) && 
			$("#br").hasClass(player)) 
			||
			($("#tr").hasClass(player) && 
			$("#mm").hasClass(player) && 
			$("#bl").hasClass(player)) 
			||
			($("#tl").hasClass(player) && 
			$("#mm").hasClass(player) && 
			$("#br").hasClass(player)) 
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