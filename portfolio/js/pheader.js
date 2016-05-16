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
        "KATIE JERGENS<span class=\"logo_separator\"></span>UX DESIGNER" +
      "</a></div>" +
      "<div class=\"clearfix\"></div>" +
      "</div></div> ";

$(document).ready(function(){
	document.getElementById("header_container").innerHTML = header;
});