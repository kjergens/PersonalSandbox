function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

// build menu
var getMenuItem = function (itemData) {
    var item = $("<div class=\"menu_item\">")  
        .append("<a href=\"" + itemData.link + "\">" +
            "<div class=\"thumb_container\">" + 
            "<img src=\"../blog/images/" + itemData.image +
             "\"></div>" +
             " <div class=\"article_title_container\">" + 
            " <div class=\"article_title\">" + 
            itemData.title + 
            "<div class=\"article_subtitle\">" +
            itemData.subtitle + "</div>" +
            "</div></div></a>");
    item = item.append("</div><div class=\"clearfix\"></div>");
    return item;
};

$(function () {

    // menu container
    $("#right_menu").append("<div id=\"menu_container\"></div>"); // wrap the menus in a container

    // popular menu
    $("#menu_container").append("<div id=\"popular\"></div>");
    var $popularmenu = $("#popular");

    $popularmenu.append("<div class=\"menu_heading\">Most popular</div>");
    shuffle(data.popular);
    // loop through data and build menu
    for (var i = 0; i<4; i++) {
         $popularmenu.append(getMenuItem(data.popular[i]));
    } 

    // recent menu
    $("#menu_container").append("<div id=\"sidemenu\"></div>");
    var $menu = $("#sidemenu");

    $menu.append("<br><br><div class=\"menu_heading\">More articles</div>");

    shuffle(data.menu);

    // loop through data and build menu
    for (var i = 0; i<5; i++) {
         $menu.append(getMenuItem(data.menu[i]));
    }  


});




