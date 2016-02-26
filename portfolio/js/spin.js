var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)',
							    '-webkit-transition-duration': '0.8s',
							    '-moz-transition-duration': '0.8s',
							    '-o-transition-duration': '0.8s',
							    'transition-duration': '0.8s'});
    return $(this);
};

$(document).ready(function () {

$('.rotate').click(function() {
    rotation += 5;
    $(this).rotate(rotation);
});

});