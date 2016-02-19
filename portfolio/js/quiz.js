$(document).ready(function () {

	var score=0;
	var option1_answered = false;
	var option2_answered = false;

/*
Question 1
*/
	$(".option1").click(function() {

		if (!option1_answered) {
			document.getElementById("blackout1").style.opacity = 0;
			document.getElementById("result1_container").style.opacity = 1;

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("correct1").style.background = "#b2d8b2";
				document.getElementById("correct1").style.border = "6px solid #66b266";
				document.getElementById("result1").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("correct1").style.border = "6px solid #3a3a3a";
				this.style.background = "#9a9a9a";
				document.getElementById("result1").innerHTML += "<h3>Incorrect</h3>";
			}
			document.getElementById("score1").innerHTML += "<h4>Score: " + score + " out of 1</h4>";

			option1_answered = true;
		}
	}); 

/*
Question 2
*/
	$(".option2").click(function() {

		if (!option2_answered) {
			document.getElementById("blackout2").style.opacity = 0;
			document.getElementById("result2_container").style.opacity = 1;

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("correct2").style.background = "#b2d8b2";
				document.getElementById("correct2").style.border = "6px solid #66b266";
				document.getElementById("result2").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("correct2").style.border = "6px solid #3a3a3a";
				this.style.background = "#9a9a9a";
				document.getElementById("result2").innerHTML += "<h3>Incorrect</h3>";
			}
			document.getElementById("score2").innerHTML += "<h4>Score: " + score + " out of 1</h4>";

			option2_answered = true;
		}
	}); 

});

