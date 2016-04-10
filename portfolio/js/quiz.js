var displayQuiz = function() {
	var setno = 1;
	var quizmarkup = "<div class=\"row\">";
	var questionno = 1;

	/* lay out the images */
	quizmarkup += "<h4>Which is the real title?</h4>";
	quizmarkup += "<div class=\"quizimg col-sm-6\">";

	// loop through all question images and display them all one one top of the other
	$.each(quiz, function () { 
		quizmarkup += "<img id=\"img_" + setno + "_r\" src=\"" + this.img_r + "\">";
		quizmarkup += "<img id=\"img_" + setno + "_h\" src=\"" + this.img_h + "\">";
		setno++;
	});
	quizmarkup += "</div>";

	/* lay out the questions */
	quizmarkup += "<div class=\"quizopts col-sm-6\">";

   // loop through all question sets and display them all one one top of the other
   	setno = 1; // reset setno, for the questions
   	
	$.each(quiz, function () { 
		quizmarkup += "<div class=\"questionset\" id=\"set_" + setno + "\">"
		quizmarkup += "<ul>";
		$.each(this.opts, function () {
			quizmarkup += "<li class=\"option\">" + this.title + "</li>";});
		quizmarkup += "</ul>";
		setno++;
	});

	
	quizmarkup += "</div>";
	quizmarkup += "<div id=\"nextbtn\"></div></div>";

	$("#quiz").append(quizmarkup);
}


/*
When page has been loaded.
*/
$(document).ready(function () {

	/*
	Display the quiz that is stored in quiz variable. 
	Need to include a .js in the .html that has a quiz array
	*/
    displayQuiz();

	/*
	Start counting at highest number and go down. The question 
	sets are loaded on top of each other so highest number 
	on top.
	*/
    var currentsetno = quiz.length;

	/*
	When you click an option, remove the blurry image to reveal 
	the answer.
	*/
	$(".option").click(function() {
		$("#img_" + currentsetno + "_h").css("display", "none");
		$("#nextbtn").css("display", "block");
	}); 

	/*
	When click Next btn, remove last answer imge to reveal the new image.
	Decrease the currentsetno.
	*/
	$("#nextbtn").click(function() {
		var currentoptions = $("#set_" + currentsetno);
		var currentimg = $("#img_" + currentsetno + "_r");

		currentimg.css("display", "none");
		currentoptions.css("display", "none");
		$("#nextbtn").css("display", "none");
		currentsetno--;
	}); 

});



