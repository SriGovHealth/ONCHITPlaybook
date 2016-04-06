// Scrolling URL update, nav state change
var topHash = "#intro";
var currentHash = "#top";
$(document).scroll(function () {
  $('.section-header').each(function () {
    var top = window.pageYOffset;
    var distance = top - $(this).offset().top;
    var hash = $(this).attr('id');
    if (distance < 30 && distance > -30 && currentHash !== hash) {
      history.replaceState({page: 1}, hash, "#" + hash);
      currentHash = hash;
      var path = window.location.pathname + window.location.hash;

      $('.subnav li a').each(function(){
        var myHref = $(this).attr('href');
        if (path === myHref) {
          $('.has-subnav').removeClass("current");
          $('.subnav li a').removeClass("now");
          $(this).addClass("now");
        }
      });

      if (path.indexOf(topHash) > -1) {
        //$('.has-subnav').hasClass("active").addClass("current");
        $('.has-subnav').each(function(){
          if ($(this).hasClass('active')) {
            $(this).addClass('current');
          }
        });
        $('.subnav li a').removeClass("now");
      }
    }
  });
});

/*
$(".content h2").stickOnScroll({
    topOffset: 0,
    setParentOnStick:   true,
    setWidthOnStick:    true
});
*/
