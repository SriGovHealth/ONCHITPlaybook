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

$(".content-slide-next").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var next = $(this).attr('href');
  $(".content-slide").removeClass("on");
  $(next).addClass("on");
});

$(".content-slide-previous").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var previous = $(this).attr('href');
  $(".content-slide").removeClass("on");
  $(previous).addClass("on");
});

$(".myth-block").addClass("myth-on");

$(".myth-control button").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if ($(this).parent().parent().parent().parent().find(".myth-block").hasClass("myth-on")) {
    $(this).parent().parent().parent().parent().find(".myth-block").removeClass("myth-on");
    $(this).parent().parent().parent().parent().find(".myth-block").addClass("myth-off");
  }
  else {
    $(this).parent().parent().parent().parent().find(".myth-block").removeClass("myth-off");
    $(this).parent().parent().parent().parent().find(".myth-block").addClass("myth-on");
  }
});

$("#sticky-header-1").stickOnScroll({
    footerElement:      $("#sticky-header-2"),
    setWidthOnStick:    true
});

$("#sticky-header-2").stickOnScroll({
    footerElement:      $("#sticky-header-3"),
    setWidthOnStick:    true
});

$("#sticky-header-3").stickOnScroll({
    footerElement:      $("#sticky-header-4"),
    setWidthOnStick:    true
});

$("#sticky-header-4").stickOnScroll({
    setWidthOnStick:    true
});

$('.expand-control').colorbox({maxHeight:'95%'});
$('.expand-thumbnail').colorbox({maxHeight:'95%'});
