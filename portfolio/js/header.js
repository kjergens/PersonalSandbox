var header = "<div id=\"header\">" +
      "<span id=\"site_title\">" +
        "<a href=\"index.html\">" +
        "<span id=\"name\">KATIE JERGENS</span> UX DESIGNER" +
      "</a></span>" +
      "<ul id=\"menu\">" +
        "<li><a href=\"../index.html\">Home</a></li>" +
        "<li><a href=\"../resume.html\">Resum&#233;</a></li>" +
        "<li><a href=\"../portfolio.html\">Portfolio</a></li>" +
        "<li class=\"current\"><a href=\"index.html\">Blog</a></li>" +
        "<li><a href=\"../contact.html\">Contact</a></li>" +
        "<li><a href=\"../about.html\">About Me</a></li>" +
      "</ul></div> ";

$(document).ready(function(){
	document.getElementById("header_container").innerHTML = header;
});