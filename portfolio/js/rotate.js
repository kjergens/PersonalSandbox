var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)',
				 '-webkit-transition-duration': '0.9s',
				  '-moz-transition-duration': '0.9s',
				  '-o-transition-duration': '0.9s',
				'transition-duration': '0.9s'});
    return $(this);
};

$(document).ready(function () {

$('.rotate').click(function(evt) {
     var div = $('.rotate');
     var offset = div.offset();
         var center_x = (offset.left) + (div.width()/2);
         var center_y = (offset.top) + (div.height()/2);
         var mouse_x = evt.pageX; 
         var mouse_y = evt.pageY;
         //var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
         //var radians = Math.atan2(mouse_x, mouse_y);
         var radians = Math.atan2(Math.abs(mouse_x - center_x), mouse_y - center_y);
         var degree = (radians * (180 / Math.PI) * -1) + 90; 
         div.css('-moz-transform', 'rotate('+degree+'deg)');
         div.css('-webkit-transform', 'rotate('+degree+'deg)');
         div.css('-o-transform', 'rotate('+degree+'deg)');
         div.css('-ms-transform', 'rotate('+degree+'deg)');
         div.css('-webkit-transition-duration', '0.9s');
         div.css('-moz-transition-duration', '0.9s');
         div.css('-o-transition-duration','0.9s');
         div.css('transition-duration','0.9s');
       
    });

});