$(document).ready(function () {

	$(".option1").click(function() {
		var f = this;
		document.getElementById("book1").style.opacity = 0;
		this.style.border = "6px solid red";
		document.getElementById("correct").style.border = "6px solid green";
	}); 

});

