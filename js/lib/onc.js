// Scrolling URL update, nav state change
var topHash = "#intro";
var currentHash = "#top";
$(document).scroll(function () {
  $('.section-header').each(function () {
    var top = window.pageYOffset;
    var distance = top - $(this).offset().top;
    var hash = $(this).attr('id');
    var path = window.location.pathname + window.location.hash;
    var prevHash = $(this).prevAll('.section-header:first').attr('id');

    if (distance < 30 && distance > -30 && currentHash !== hash) {
      history.replaceState({page: 1}, hash, "#" + hash);
      currentHash = hash;
      path = window.location.pathname + window.location.hash;

      $('.subnav li a').each(function(){
        var myHref = $(this).attr('href');
        if (path === myHref) {
          $('.has-subnav').removeClass("current");
          $('.subnav li a').removeClass("now");
          $(this).addClass("now");
        }
      });
    }

    /*else if (distance < -30 && currentHash === hash) {
      if (typeof prevHash !== 'undefined') {
        path = window.location.pathname + "#" + prevHash;

        $('.subnav li a').each(function(){
          var myHref = $(this).attr('href');
          if (path === myHref) {
            $('.has-subnav').removeClass("current");
            $('.subnav li a').removeClass("now");
            $(this).addClass("now");
          }
        });
      }
    }*/

    if (path.indexOf(topHash) > -1) {
      $('.has-subnav').each(function(){
        if ($(this).hasClass('active')) {
          $(this).addClass('current');
        }
      });
      $('.subnav li a').removeClass("now");
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

$(".sticky-header").stick_in_parent();

$('.expand-control').colorbox({maxHeight:'95%'});
$('.expand-thumbnail').colorbox({maxHeight:'95%'});
