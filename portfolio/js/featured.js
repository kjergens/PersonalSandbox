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


// build index page 
var show_featured = function() {
    // main, most recent article
    var markup = "<div class='featured'>" +
    "<a href=\"" + data.menu[0].link + "\">" +
   "<figure><img src=\"../blog/images/" + data.menu[0].big_image + "\"></figure>" +
    "<div class='title'>" + data.menu[0].title + "</div>" +
    "</a>" +
    "<div class='date'>" + data.menu[0].date + "</div><br>" +
    '<div id="twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.katieinbrooklyn.com/blog/index.html">Tweet</a></div>' +
    '<div class="fb-like" data-share="true" data-width="240" data-show-faces="false"></div>' +
    '<div class="clearfix"></div>' +
    "<p>" + data.menu[0].blurb + 
   "<a href=\"" + data.menu[0].link + "\"> Read more.</a>" + "</p>" +

    "</div>";

    // below the main, some more articles.
    markup += "<h3 id=\"morearticles\">Recent articles</h3>";

    // row 1
    for (var i=1; i<=3; i++) {
        markup += "<div class='featuredmore'>" +
        "<a href=\"" + data.menu[i].link + "\">" +
        " <h4>" + data.menu[i].title +  "</h4>" +
        "<img src=\"../blog/images/" + data.menu[i].image + "\"></a>" +
        "<div class=\"date\">" + data.menu[i].date + "</div>" +
        "<p>" + data.menu[i].blurb + 
        "<a href=\"" + data.menu[i].link + "\"> Read more.</a>" + "</p>" +
        "</div></a>";
    }

    markup += "<div class=\"clearfix\"></div><hr>"; // clear the floats

    // row 2
    for (var i=4; i<=6; i++) {
        markup += "<div class='featuredmore'>" +
        "<a href=\"" + data.menu[i].link + "\">" +
        " <h4>" + data.menu[i].title +  "</h4>" +
        "<img src=\"../blog/images/" + data.menu[i].image + "\"></a>" +
        "<div class=\"date\">" + data.menu[i].date + "</div>" +
        "<p>" + data.menu[i].blurb + 
        "<a href=\"" + data.menu[i].link + "\"> Read more.</a></p>" + 
        "</div></a>";
    }

    markup += "<div class=\"clearfix\"></div>"; // clear the floats

    $("#featured_articles").append(markup);
};

// build side menu, excluding main articles
var get_menu_item = function (itemData) {
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

    //display featured articles in main body
    show_featured();

        // menu container
    $("#right_menu").append("<div id=\"menu_container\"></div>"); // wrap the menus in a container

    // popular menu
    $("#menu_container").append("<div id=\"popular\"></div>");
    var $popularmenu = $("#popular");

    $popularmenu.append("<div class=\"menu_heading\">Most popular</div>");
    shuffle(data.popular);
    // loop through data and build menu
    for (var i = 0; i<4; i++) {
         $popularmenu.append(get_menu_item(data.popular[i]));
    } 

    // recent menu
    $("#menu_container").append("<div id=\"sidemenu\"></div>");
    var $menu = $("#sidemenu");

    $menu.append("<br><br><div class=\"menu_heading\">More articles</div>");

    //shuffle(data.menu);

    // loop through data and build menu
    for (var i = 7; i<data.menu.length; i++) {
         $menu.append(get_menu_item(data.menu[i]));
    }  

});

