// build index page 
var show_featured = function() {
    // main, most recent article
    var markup = "<div class='featured'>" +
            "<a href=\"" + data.menu[0].link + "\">" +
           "<figure class='featuredimg'><img src=\"../blog/images/" + data.menu[0].image + "\"></figure>" +
           "</a>" +
            "<a href=\"" + data.menu[0].link + "\">" +
            "<div id='headline'>" +
            "<div class='title'>" + data.menu[0].title + "</div>" +
            "</a>" +
            "<div class='date'>" + data.menu[0].date + "</div>" +
            "<p class='blurb'>" + data.menu[0].blurb + 
           "<a href=\"" + data.menu[0].link + "\">... Read more.</a>" + "</p>" +
            "</div></div>";

    // below the main, some more articles.
    markup += "<h3 id=\"morearticles\">More articles</h3><div class=\"more\">";

    // row 1
    for (var i=1; i<=3; i++) {
        markup += "<a href=\"" + data.menu[i].link + "\">" +
        "<div class='featuredmore'>" +
        "<div class='featuredmoreimg'>" +
        "<figure><img src=\"../blog/images/" + data.menu[i].image + "\"></figure>" +
        "</div>" +
        " <h4>" + data.menu[i].title +  "</h4>" +
        "<div class=\"date\">" + data.menu[i].date + "</div>" +
        "<p class=\"blurb\">" + data.menu[i].blurb + "</p>" +
        "<a href=\"" + data.menu[i].link + "\">... Read more.</a>" + 
        "</div></a>";
    }

    markup += "</div><div class=\"clearfix\"></div>"; // clear the floats

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
            "</div>" +
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
