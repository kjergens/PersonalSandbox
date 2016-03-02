var displayQuiz = function() {
	/*lay out the questions and images*/
	var quizmarkup = "<div class=\"row\">";

	/* lay out the images */
	quizmarkup += "<div class=\"quizimg col-sm-6\">";
	quizmarkup += "<img src=\"" + quiz[0].img_r + "\">";
	quizmarkup += "<img id=\"blurry\" src=\"" + quiz[0].img_h + "\">";
	quizmarkup += "</div>";

	/* lay out the questions */
	quizmarkup += "<div class=\"col-sm-6\"><ul class=\"options\">";

	$.each(quiz[0].opts, function () {
		quizmarkup += "<li class=\"option\">" + this.title + "</li>";});

	quizmarkup += "</ul></div></div>";

	$("#quiz").append(quizmarkup);
}

	/*
Call this function each time an answer is selected.
*/
var getTotal = function() {
	if (answered == total) {
			document.getElementById("total_result").innerHTML += "<h3>Total: " + score + " out of " + answered + "</h3>";
	}
}

$(document).ready(function () {

	var score=0;
	var answered = 0;
	var total = 7;
	var question_last_answered = false;


    displayQuiz();

/*
Handle option clicked
*/
	$(".option").click(function() {
		$("#blurry").css("opacity", "0");
		alert(clicked);
	}); 

});



