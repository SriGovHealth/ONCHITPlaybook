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



$(".content-slide-prev").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var prevItem = $(".content-slide.on").prev();

  $(".content-slide-prev").removeClass("limit");
  $(".content-slide-next").removeClass("limit");

  if(!$(".content-slide.on").prev('.content-slide').prev('.content-slide').length) {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(prevItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-prev").addClass("limit");
  }
  else {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(prevItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-prev").removeClass("limit");
  }
});

$(".content-slide-next").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var nextItem = $(".content-slide.on").next();

  $(".content-slide-prev").removeClass("limit");
  $(".content-slide-next").removeClass("limit");

  if(!$(".content-slide.on").next('.content-slide').next('.content-slide').length) {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(nextItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-next").addClass("limit");
  }
  else {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(nextItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-next").removeClass("limit");
  }
});



$(".reality-control").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var parentID = $(this).parent().parent().parent().attr("id");
  $("#" + parentID + " .myth-control").attr("aria-expanded", "false");
  $("#" + parentID + " .myth-content").attr("aria-hidden", "true").attr("tabindex", "");
  $("#" + parentID + " .mythreality-footer .myth-control").attr("aria-hidden", "false");
  $("#" + parentID + " .reality-control").attr("aria-expanded", "true");
  $("#" + parentID + " .mythreality-footer .reality-control").attr("aria-hidden", "true");
  $("#" + parentID + " .reality-content").attr("aria-hidden", "false").attr("tabindex", "-1");
});

$(".myth-control").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var parentID = $(this).parent().parent().parent().attr("id");
  $("#" + parentID + " .reality-control").attr("aria-expanded", "false");
  $("#" + parentID + " .reality-content").attr("aria-hidden", "true").attr("tabindex", "");
  $("#" + parentID + " .mythreality-footer .reality-control").attr("aria-hidden", "false");
  $("#" + parentID + " .myth-control").attr("aria-expanded", "true");
  $("#" + parentID + " .mythreality-footer .myth-control").attr("aria-hidden", "true");
  $("#" + parentID + " .myth-content").attr("aria-hidden", "false").attr("tabindex", "-1");
});

$(".sticky-header").stick_in_parent();

$('.hotspot-link').colorbox({inline:true, maxHeight:'95%', maxWidth:'95%'});
$('.expand-control').colorbox({maxHeight:'95%', maxWidth:'95%'});
$('.expand-thumbnail').colorbox({maxHeight:'95%', maxWidth:'95%'});
