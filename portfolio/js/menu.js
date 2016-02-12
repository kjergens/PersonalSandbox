$(function () {
    var getMenuItem = function (itemData) {
        var item = $("<div class=\"menu_item\">")  
            .append("<a href=\"" + itemData.link + "\"><h5>" + 
                itemData.title + 
                "</h5><figure><img src=\"../blog/images/" + itemData.image +
                 "\"></figure>");
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