$(document).ready(function () {

	var score=0;
	var question1_answered = false;
	var question2_answered = false;
	var question3_answered = false;
	var question4_answered = false;
	var question5_answered = false;

/*
Question 1
*/
	$(".option1").click(function() {

		if (!question1_answered) {
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

			question1_answered = true;
		}
	}); 

/*
Question 2
*/
	$(".option2").click(function() {

		if (!question2_answered) {
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
			document.getElementById("score2").innerHTML += "<h4>Score: " + score + " out of 2</h4>";

			question2_answered = true;
		}
	}); 


	/*
Question 3 - 12 changes to make
*/
	$(".option3").click(function() {

		if (!question3_answered) {
			document.getElementById("blackout3").style.opacity = 0;
			document.getElementById("result3_container").style.opacity = 1;

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("correct3").style.background = "#b2d8b2";
				document.getElementById("correct3").style.border = "6px solid #66b266";
				document.getElementById("result3").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("correct3").style.border = "6px solid #3a3a3a";
				this.style.background = "#9a9a9a";
				document.getElementById("result3").innerHTML += "<h3>Incorrect</h3>";
			}
			document.getElementById("score3").innerHTML += "<h4>Score: " + score + " out of 3</h4>";

			question3_answered = true;
		}
	});

	/*
Question 4 - 12 changes to make
*/
	$(".option4").click(function() {

		if (!question4_answered) {
			document.getElementById("blackout4").style.opacity = 0;
			document.getElementById("result4_container").style.opacity = 1;

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("correct4").style.background = "#b2d8b2";
				document.getElementById("correct4").style.border = "6px solid #66b266";
				document.getElementById("result4").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("correct4").style.border = "6px solid #3a3a3a";
				this.style.background = "#9a9a9a";
				document.getElementById("result4").innerHTML += "<h3>Incorrect</h3>";
			}
			document.getElementById("score4").innerHTML += "<h4>Score: " + score + " out of 4</h4>";

			question4_answered = true;
		}
	});

	/*
Question 5 - 12 changes to make
*/
	$(".option5").click(function() {

		if (!question5_answered) {
			document.getElementById("blackout5").style.opacity = 0;
			document.getElementById("result5_container").style.opacity = 1;

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("correct5").style.background = "#b2d8b2";
				document.getElementById("correct5").style.border = "6px solid #66b266";
				document.getElementById("result5").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("correct5").style.border = "6px solid #3a3a3a";
				this.style.background = "#9a9a9a";
				document.getElementById("result5").innerHTML += "<h3>Incorrect</h3>";
			}
			document.getElementById("score5").innerHTML += "<h4>Score: " + score + " out of 5</h4>";

			question5_answered = true;
		}
	});

});

