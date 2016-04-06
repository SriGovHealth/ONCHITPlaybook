$(".site-menu button").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if ($(".nav").hasClass("closed")) {
    $(".nav").removeClass("closed");
    $(".nav").addClass("open").attr("aria-expanded", "true");
    $(".overlay").addClass("on");
  }
  else {
    $(".nav").removeClass("open");
    $(".nav").addClass("closed").attr("aria-expanded", "false");
    $(".overlay").removeClass("on");
  }
});

$(".overlay").click(function (event) {
  $(".nav").removeClass("open");
  $(".nav").addClass("closed").attr("aria-expanded", "false");
  $(".overlay").removeClass("on");
});

$(".subnav a").click(function (event) {
  $(".nav").removeClass("open");
  $(".nav").addClass("closed").attr("aria-expanded", "false");
  $(".overlay").removeClass("on");
});


// Open subnav of active page
if ($(".group").hasClass("active")) {
  $(".group.active").children("ul .subnav").removeClass("closed").attr("aria-hidden", "false").attr("aria-expanded", "true");
  $(".group.active").children("a.subnav-toggle").html("&rarr;");
}

// Open/close subnavsw
$(".subnav-toggle").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if ($(this).parent().find(".subnav").hasClass("closed")) {
    // reset other nav links
    $(".subnav").addClass("closed").attr("aria-hidden", "true").attr("aria-expanded", "false");
    $(".has-subnav").removeClass("active");
    $(".subnav-toggle").html("&darr;");

    $(this).parent().find(".subnav").removeClass("closed").attr("aria-hidden", "false").attr("aria-expanded", "true");
    $(this).html("&uarr;");
    $(this).parent().addClass("active");
  }
  else {
    $(this).parent().find(".subnav").addClass("closed").attr("aria-hidden", "true").attr("aria-expanded", "false");
    $(this).html("&darr;");
    $(this).parent().removeClass("active");
  }
});

// Display:none updates aria-hidden (JAWS bug)
if (window.matchMedia) {
  if (window.matchMedia("(min-width: 56.25em)").matches) {
    $(".site-bar").attr("aria-hidden", "true");
    $("nav").attr("aria-expanded", "true");
  }
  if (window.matchMedia("(max-width: 56.25em)").matches) {
    $(".site-bar").attr("aria-hidden", "false");
    $("nav").attr("aria-expanded", "false");
  }
}

// Keep active nav item visible on load
$(document).ready(function(){
  if( $('.subnav .active').length ) {
    $(".header").scrollTop($(".subnav .active").offset().top - 150);
  }
});
