var header = "<div class=\"container\"><div class=\"row\">" +
      "<ul id=\"menu\">" +
        "<li><a href=\"index.html\">Home</a></li>" +
        "<li><a href=\"resume.html\">Resum&#233;</a></li>" +
        "<li><a href=\"portfolio.html\">Portfolio</a></li>" +
        "<li><a href=\"blog/index.html\">Blog</a></li>" +
        "<li><a href=\"contact.html\">Contact</a></li>" +
        "<li><a href=\"about.html\">About Me</a></li>" +
      "</ul>" + 
       "<div id=\"site_title\">" +
        "<a href=\"index.html\">" +
        "<span class=\"name\">KATIE JERGENS</span>" +
        "<span class=\"logo_separator\">&nbsp;</span>" +
        "<span class=\"name\">UX DESIGNER</span>" +
      "</a></div>" +
      "<div class=\"clearfix\"></div>" +
      "</div></div> ";

$(document).ready(function(){
	document.getElementById("header_container").innerHTML = header;
});