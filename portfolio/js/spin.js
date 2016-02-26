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

$('.rotate').click(function() {
    rotation += 5;
    $(this).rotate(rotation);
});

});