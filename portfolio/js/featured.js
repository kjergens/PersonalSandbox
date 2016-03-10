// build index page 
var show_featured = function() {
    // main, most recent article
    var markup = "<div class='featured'>" +
            "<div class=\"featuredimg\">" +
            "<a href=\"" + data.menu[0].link + "\">" +
            "<figure><img src=\"../blog/images/" + data.menu[0].image + "\"></figure>" +
            "</a></div>" +
            "<div class=\"featuredtext\"><a href=\"" + data.menu[0].link + "\">" +
            " <h2>" + data.menu[0].title +  "</h2></a>" +
            "<div class=\"date\">" + data.menu[0].date + "</div>" +
            "<p>" + data.menu[0].blurb + "</p>" + 
             "<p><a href=\"" + data.menu[0].link + "\">Read more.</a></p>" + 
            "</div><div class=\"clearfix\"></div></div>";

    markup += "<div class=\"clearfix\"></div><h2>More articles</h2>";

    // below the main, some featured recent articles.
    for (var i=1; i<=3; i++) {
        markup += "<div class='featuredmore'>" +
            "<a href=\"" + data.menu[i].link + "\">" +
            " <h4>" + data.menu[i].title +  "</h4></a>" +
            "<p>" + data.menu[i].blurb + "</p>" + 
            "<a href=\"" + data.menu[i].link + "\">" +
            "<figure class='featuredmoreimg'><img src=\"../blog/images/" + data.menu[i].image + "\"></figure></a>" +
            "<div class=\"date\">" + data.menu[i].date + "</div>" +
             "<p><a href=\"" + data.menu[i].link + "\">Read more.</a></p>" + 
            "</div>";
    }

    markup += "<div class=\"clearfix\"></div>";

    $("#featured_articles").append(markup);
};

// build side menu, excluding main articles
var get_menu_item = function (itemData) {
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
            itemData.date  + "</div>" +
            "</div></div>");
    item = item.append("</div>");
    return item;
};

$(function () {

    //display featured articles in main body
    show_featured();

    // create side menu
    $("#right_menu").append("<div id=\"menu_heading\">Recent Posts</div><div id=\"sidemenu\"></div>");

    // loop through data and add remaining items to menu
    for (var i=4; i<=data.menu.length; i++) {
        $("#sidemenu").append(get_menu_item(data.menu[i]));
    }

});
