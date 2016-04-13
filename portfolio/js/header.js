var header = "<div class=\"container\"><div class=\"row\">" +
      "<div class=\"col-md-6 col-sm-12\" id=\"site_title\">" +
        "<a href=\"index.html\">" +
        "<span class=\"name\">katie</span>in<span class=\"name\">brooklyn</span>" +
      "</a></div>" +
      "<div class=\"col-md-6 col-sm-12\"><ul id=\"menu\">" +
        "<li><a href=\"../index.html\">Home</a></li>" +
        "<li><a href=\"../resume.html\">Resum&#233;</a></li>" +
        "<li><a href=\"../portfolio.html\">Portfolio</a></li>" +
        "<li class=\"current\"><a href=\"index.html\">Blog</a></li>" +
        "<li><a href=\"../contact.html\">Contact</a></li>" +
        "<li><a href=\"../about.html\">About Me</a></li>" +
      "</ul></div></div>" +
      "<p id=\"tag\">Short articles about the things we see.</p>" +
      "</div></div> ";

$(document).ready(function(){
	document.getElementById("header_container").innerHTML = header;
});