var tetradic_rotation = 0;
var analogous_rotation = 0;
var complementary_rotation = 0;
var split_complementary_rotation = 0;
var triadic_rotation = 0;

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

$('#tetradic').click(function() {
    tetradic_rotation += 5;
    $(this).rotate(tetradic_rotation);
});

$('#analogous').click(function() {
    analogous_rotation += 5;
    $(this).rotate(analogous_rotation);
});

$('#complementary').click(function() {
    complementary_rotation += 5;
    $(this).rotate(complementary_rotation);
});

$('#split_complementary').click(function() {
    split_complementary_rotation += 5;
    $(this).rotate(split_complementary_rotation);
});

$('#triadic').click(function() {
    triadic_rotation += 5;
    $(this).rotate(triadic_rotation);
});

});