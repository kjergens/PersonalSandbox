$(function () {
    var getMenuItem = function (itemData) {
        var item = $("<div class=\"menu_item\">")  
            .append("<a href=\"" + itemData.link + "\">" +
                "<figure><img src=\"../blog/images/" + itemData.image +
                 "\"></figure>" +
                " <div class=\"article_title\">" + 
                itemData.title + 
                "<div class=\"article_subtitle\">" +
                itemData.subtitle +
                "</div></div>");
        item = item.append("</div>");
        return item;
    };

var $menu = $("#sidemenu");
    
$.each(data.menu, function () {
        $menu.append(
            getMenuItem(this)
        );
    });
});