var delay = 700;
var hght = '1200px';



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