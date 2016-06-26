$(document).ready(function() {

	var isPinkTurn = true;
	var turnsTaken = 0;
	var pinkScore=0;
	var greenScore=0;

	/*********************
		* Blank square on-click action
		********************
	 */
	$(".blank").click(function(){

		// If it still has "blank" class it's not filled yet.
		// It doesn't automatically unbind when "blank" class is removed.
		if ($(this).hasClass("blank") ) {

			// Fill in square
			var color = "";
			if (isPinkTurn) {
				color = "Pink";
			}
			else {
				color = "Green";
			}

			$(this).removeClass("blank");
			$(this).addClass(color);

			// Only check for winner after 5 turns. 
			//   Game can't be won in fewer.
			turnsTaken++;
			if (turnsTaken >= 5) {
				if (checkWinner(color)) {
					
					if (isPinkTurn) {
						pinkScore++;
					}
					else {
						greenScore++;
					}

					$("#summary").html("<h2>" + color + " wins</h2><h3>Pink:" + pinkScore + "</h3><h3>Green: " + greenScore + "</h3>");
					reset();
				};
			}

			// Switch turns
			isPinkTurn = !isPinkTurn;
		}
	});

	/*********************
	 * Reset board.
	 ********************
	 */
	function reset() {
		turnsTaken=0;
		$(".square").removeClass("Pink");
		$(".square").removeClass("Green");
		$(".square").addClass("blank");
	}

	/*********************
	 * Check winner.
	 ********************
	 */
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
	 ********************
	 */
		$("#reset").click(function(){
			reset();
		});
	});