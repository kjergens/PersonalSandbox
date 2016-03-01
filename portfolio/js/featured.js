// build index page 
$(function () {

    // loop through data and build menu
    for (var i=0; i<=2; i++) {
        $("#featured_articles").append("<div class='featured'><a href=\"" + data.menu[i].link + "\">" +
            " <h3>" + 
            data.menu[i].title + 
            "</h3></a>" +
            "<div class=\'date\'>" + data.menu[i].date + "</div>" +
            "<p>" +
            data.menu[i].subtitle +
            "</p><a href=\"" + data.menu[i].link + "\">" +
            "<figure><img src=\"../blog/images/" + data.menu[i].image +
             "\"></figure></a></div>"
            );
    }

});