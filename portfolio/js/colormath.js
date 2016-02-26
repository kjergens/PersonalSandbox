var delta = 10;

$(document).ready(function () {

	$("#tetric").rotate({bind:{
  click: function(){
    $(this).rotate({
      	angle: 0,
      	animateTo:delta
      	});
    delta += 10;
    	}
  	}
	});

});