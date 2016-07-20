var nav = '<nav class="navbar navbar-default" > \
  <div class="container-fluid"> \
   <!-- Brand and toggle get grouped for better mobile display --> \
    <div class="navbar-header"> \
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> \
        <span class="sr-only">Toggle navigation</span> \
        <span class="icon-bar"></span> \
        <span class="icon-bar"></span> \
        <span class="icon-bar"></span> \
      </button> \
 <a class="navbar-brand" id="site_title" href="index.html"><span class=\"name\">KATIE JERGENS</span><span class=\"logo_separator\">&nbsp;</span><span class=\"name\">UX DESIGNER</span></a> \
    </div> \
    <!-- Collect the nav links, forms, and other content for toggling --> \
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> \
      <ul class="nav navbar-nav navbar-right" id="menu"> \
        <li><a href="index.html">Home</a></li> \
        <li><a href="../portfolio.html">Portfolio</a></li> \
        <li><a href="../resume.html">Resum&eacute;</a></li> \
        <li><a href="../about.html">About Me</a></li> \
        <li><a href="../contact.html">Contact</a></li> \
      </ul> \
    </div><!-- /.navbar-collapse --> \
    <div class=\"row\" id="tag">Short articles about the things we see.</div> \
  </div><!-- /.container-fluid --> \
</nav>';



$(document).ready(function(){
  document.getElementById("header_container").innerHTML = nav;
    // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

  //hide or show the "back to top" link
  $(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) { 
      $back_to_top.addClass('cd-fade-out');
    }
  });

  //smooth scroll to top
  $back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0 ,
      }, scroll_top_duration
    );
  });
  
});




