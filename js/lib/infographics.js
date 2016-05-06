$(".ig-nav").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href');
  if ($(target).hasClass("off")) {
    $(".slide").addClass("off").attr("aria-hidden", "true");
    $(target).removeClass("off").attr("aria-hidden", "false");
  }
});

$(".hotspot-link").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href');
  if ($(target).hasClass("lightbox-off")) {
    $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");
    $(".lightbox-container").addClass("backdrop");
    $(target).removeClass("lightbox-off").attr("aria-hidden", "false");
  }
});

$(".lightbox-close").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE
  $(".lightbox-container").removeClass("backdrop");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");
});
