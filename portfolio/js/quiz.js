$(document).ready(function () {

	var score=0;

	$(".option1").click(function() {
		var f = this;
		document.getElementById("book1").style.opacity = 0;
		document.getElementById("result1").style.opacity = 1;
		this.style.border = "6px solid red";
		document.getElementById("correct").style.border = "6px solid green";

		if (this.classList.contains("correct")) {
			alert("hi");
			score++;
		}
	}); 

});

