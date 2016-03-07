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
            "<figure><img src=\"../blog/images/" + itemData.image +
             "\"></figure>" +
             " <div class=\"article_title_container\">" + 
            " <div class=\"article_title\">" + 
            itemData.title + 
            "<div class=\"article_subtitle\">" +
            itemData.subtitle + "</div>" +
             "<div class=\"article_subtitle\">" +
            //itemData.date  + "</div>" +
            "</div></div>");
    item = item.append("</div>");
    return item;
};

$(function () {

    // header
    $("#right_menu").append("<div id=\"menu_heading\">Recent Posts</div><div id=\"sidemenu\"></div>");

    var $menu = $("#sidemenu");

    shuffle(data.menu);

    // loop through data and build menu
    for (var i = 0; i<=3; i++) {
         $menu.append(getMenuItem(data.menu[i]));
    }

    //$.each(data.menu, function () { $menu.append(getMenuItem(this));});
    

});




