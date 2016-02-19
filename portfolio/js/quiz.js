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
			document.getElementById("correct1").style.border = "6px solid green";

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("result1").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				this.style.border = "6px solid red";
				document.getElementById("result1").innerHTML += "<h3>Incorrect</h3>";
			}
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
			this.style.border = "6px solid red";
			document.getElementById("correct2").style.border = "6px solid green";

			if (this.classList.contains("correct")) {
				score++;
				document.getElementById("result2").innerHTML += "<h3>Correct!</h3>";
			}
			else {
				document.getElementById("result2").innerHTML += "<h3>Incorrect</h3>";
			}
			option2_answered = true;
		}
	}); 

});

