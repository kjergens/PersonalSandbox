var displayQuiz = function() {
	var setno = 1;
	var quizmarkup = "<div class=\"row\">";

	/* lay out the images */
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
		quizmarkup += "<ul class=\"options\" id=\"options_" + setno + "\">";
		$.each(this.opts, function () {
			quizmarkup += "<li class=\"option\">" + this.title + "</li>";});
		quizmarkup += "</ul>";
		setno++;
	});

	quizmarkup += "<div id=\"nextbtn\"></div>";
	quizmarkup += "</div></div>";

	$("#quiz").append(quizmarkup);
}


/*
When page has been loaded.
*/
$(document).ready(function () {

/*
Display the quiz that is stored in quiz variable. Need to include a .js in the .html
*/
    displayQuiz();
/*
Start counting at highest number and go down. The question sets are loaded on top
of each other so highest number on top and goes down.
*/
    var currentsetno = quiz.length;
    var displayno = quiz.length-currentsetno+1; /*figure out the num to display. confusing. :/ */

/*
When you click an option, remove the blurry image to reveal the answer.
*/
$(".option").click(function() {
	$("#img_" + currentsetno + "_h").css("opacity", "0");
	$("#nextbtn").css("opacity", "1");
	alert(this);
}); 

/*
When click Next btn, remove last answer imge to reveal the new image.
Decrease the currentsetno.
*/
$("#nextbtn").click(function() {
	var currentoptions = $("#options_" + currentsetno);
	var currentimg = $("#img_" + currentsetno + "_r");

	currentimg.css("opacity", "0");
	currentoptions.css("opacity", "0");
	$("#nextbtn").css("opacity", "0");
	currentsetno--;
}); 

});



