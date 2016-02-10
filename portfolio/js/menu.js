$(function () {
    var getMenuItem = function (itemData) {
        var item = $("<div class=\"menu_item\">")  
            .append(
        $("<a>", {
            href: itemData.link,
            html: itemData.title
        }));
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