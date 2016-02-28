// build menu
var getFeaturedItem = function (itemData) {
    var item = $("<div class=\"featured\">")  
        .append("<a href=\"" + itemData.link + "\">" +
            " <h3>" + 
            itemData.title + 
            "</h3><p>" +
            itemData.subtitle +
            itemData.date +
            "</p>" +
            "<figure><img src=\"../blog/images/" + itemData.image +
             "\"></figure>"
            );
    item = item.append("</div>");
    return item;
};

$(function () {

    var $featuredmenu = $("#featured");

    // loop through data and build menu
    $.each(data.featured, function () {
            $featuredmenu.append(
                getFeaturedItem(this)
            );}
    );

});