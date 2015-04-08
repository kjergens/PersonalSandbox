var delay = 700;
var hght = '1200px';


 	// Passage 1 - Next
	$("#psg1_next").click(function(){

			$('#passage1').animate({
	      height: '0px'}, delay);

			$('#coverpage').animate({
	      height: hght});

		});


	// Passage 2 coverpage - Back
	 $("#cov_back").click(function(){

			$('#coverpage').animate({
	      height: '0px'}, delay);

			$('#passage1').animate({
	      height: hght});

		});

	// Passage 2 coverpage - Next
	 $("#cov_next").click(function(){

			$('#coverpage').animate({
	      height: '0px'}, delay);

			$('#page1').animate({
	      height: hght});

		});

	 // Page 1 - Back
	 $("#p1_back").click(function(){
			
			$('#page1').animate({
	      height: '0px'}, delay);

			$('#coverpage').animate({
	      height: hght});
			
		});

	  // Page 1 - Next
	 $("#p1_next").click(function(){

			$('#page2').animate({
	      height: hght});

			$('#page1').animate({
	      height: '0px'}, delay);
		});

	 // Page 2 - Back
	 $("#p2_back").click(function(){

			$('#page1').animate({
	      height: hght});

			$('#page2').animate({
	      height: '0px'}, delay);
		});

	 // Page 2 - Next
	 $("#p2_next").click(function(){

			$('#page3').animate({
	      height: hght});

			$('#page2').animate({
	      height: '0px'}, delay);
		});

	 // Page 3 - Back
	 $("#p3_back").click(function(){

			$('#page2').animate({
	      height: hght});

			$('#page3').animate({
	      height: '0px'}, delay);
		});

	 // Page 3 - Next
	 $("#p3_next").click(function(){

			$('#coverpage').animate({
	      height: hght});

			$('#page3').animate({
	      height: '0px'}, delay);
		});

function begin_reading() {
   document.getElementById('passageContainer').style.display = 'block';
   document.getElementById('start_reading_btn').style.display = 'none';
   //document.getElementById('start_questions_btn').style.display = 'block';
   document.getElementById('done_reading_btn').style.display = 'block';
 }

function done_reading() {
   document.getElementById('done_reading_btn').style.display = 'none';
   document.getElementById('start_questions_btn').style.display = 'block';
 }

 function start_questions() {
 	document.getElementById('questionContainer').style.display = 'block';
 	document.getElementById('start_questions_btn').style.display = 'none';
 	$("#p3_next").click();
 }