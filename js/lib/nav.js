var $sidebar = $(".sidebar");

function removeClosedFromSidebar() {
  $sidebar.removeClass("closed");
}

function removeClosedFromSidebarDelayed() {
  setTimeout(removeClosedFromSidebar,10);
}

function AddVeryClosedToSidebar() {
  $sidebar.addClass("veryClosed");
}

function AddVeryClosedToSidebarDelayed() {
  setTimeout(AddVeryClosedToSidebar,150);
}

$(".site-menu button").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if ($(".sidebar").hasClass("closed")) {
    $(".sidebar").removeClass("veryClosed");
    removeClosedFromSidebarDelayed();
    $(".sidebar").addClass("open").attr("aria-hidden", "false");
    $(".overlay").addClass("on");
  }
  else {
    $(".sidebar").removeClass("open");
    $(".sidebar").addClass("closed").attr("aria-hidden", "true");
    AddVeryClosedToSidebarDelayed();
    $(".overlay").removeClass("on");
  }
});

$(".overlay").click(function (event) {
  $(".sidebar").removeClass("open");
  $(".sidebar").addClass("closed").attr("aria-hidden", "true");
   AddVeryClosedToSidebarDelayed();
  $(".overlay").removeClass("on");
});

$(".subnav a").click(function (event) {
  $(".sidebar").removeClass("open");
  $(".sidebar").addClass("closed").attr("aria-hidden", "true");
   AddVeryClosedToSidebarDelayed();
  $(".overlay").removeClass("on");
});


// Open subnav of active page
if ($(".group").hasClass("active")) {
  $(".group.active").children("ul .subnav").removeClass("closed").attr("aria-hidden", "false");
  $("a.subnav-toggle").addClass("btn-arrow-img-down");
  $(".group.active").children("a.subnav-toggle").removeClass("btn-arrow-img-down").addClass("btn-arrow-img-right").attr("aria-expanded", "true");
}

// Open/close subnavsw
$(".subnav-toggle").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if ($(this).parent().find(".subnav").hasClass("closed")) {
    // reset other nav links
    $(".subnav").addClass("closed").attr("aria-hidden", "true");
    $(".has-subnav").removeClass("active");
    $(".subnav-toggle").removeClass("btn-arrow-img-right").removeClass("btn-arrow-img-up").addClass("btn-arrow-img-down").attr("aria-expanded", "false");
    $(".group.current").children("a.subnav-toggle").removeClass("btn-arrow-img-down").addClass("btn-arrow-img-right");

    $(this).parent().find(".subnav").removeClass("closed").attr("aria-hidden", "false");
    $(this).removeClass("btn-arrow-img-right").removeClass("btn-arrow-img-down").addClass("btn-arrow-img-up").attr("aria-expanded", "true");
    $(this).parent().addClass("active");
  }
  else {
    $(this).parent().find(".subnav").addClass("closed").attr("aria-hidden", "true");
    $(".group.current").children("a.subnav-toggle").removeClass("btn-arrow-img-down").addClass("btn-arrow-img-right");
    $(this).removeClass("btn-arrow-img-right").removeClass("btn-arrow-img-up").addClass("btn-arrow-img-down").attr("aria-expanded", "false");
    $(this).parent().removeClass("active");
  }
});

// Display:none updates aria-hidden (JAWS bug)
if (window.matchMedia) {
  if (window.matchMedia("(min-width: 60em)").matches) {
    $(".mobile-menu").attr("aria-hidden", "true");
    $(".sidebar").attr("aria-hidden", "false");
  }
  if (window.matchMedia("(max-width: 60em)").matches) {
    $(".mobile-menu").attr("aria-hidden", "false");
    $(".sidebar").attr("aria-hidden", "true");
  }
}

window.onresize = function(){
  if (window.innerWidth >= 960 || !$(".sidebar").hasClass("closed") ) { 
    $(".mobile-menu").attr("aria-hidden", "true");
    $(".sidebar").attr("aria-hidden", "false");
  } else {
    $(".mobile-menu").attr("aria-hidden", "false");
    $(".sidebar").attr("aria-hidden", "true");
  }
};

// Keep active nav item visible on load
$(document).ready(function(){
  if( $('.subnav .active').length ) {
    $(".header").scrollTop($(".subnav .active").offset().top - 150);
  }
});
