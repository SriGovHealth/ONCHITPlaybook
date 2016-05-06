$(".ig-nav").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  $("#ig-next").removeClass("limit");
  $("#ig-previous").removeClass("limit");
  $(".lightbox-container").removeClass("backdrop");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");

  var target = $(this).attr('href');

  if ($(target).hasClass("off")) {
    $(".slide").addClass("off").removeClass("on").attr("aria-hidden", "true");
    $(target).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $(".slide-control").removeClass("current").attr("aria-expanded", "false");
    $(target + "-control").addClass("current").attr("aria-expanded", "true");
  }

  if(!$(".slide.on").next('.slide').length) {
    $("#ig-next").addClass("limit");
  }

  if(!$(".slide.on").prev('.slide').prev('.slide').length) {
    $("#ig-previous").addClass("limit");
  }
});

$("#ig-next").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var nextItem = $(".slide.on").next();
  var nextItemId = $(nextItem).attr("id");

  $("#ig-next").removeClass("limit");
  $("#ig-previous").removeClass("limit");

  $(".slide-control").removeClass("current").attr("aria-expanded", "false");
  $("#" + nextItemId + "-control").addClass("current").attr("aria-expanded", "true");
  $(".lightbox-container").removeClass("backdrop");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");

  if(!$(".slide.on").next('.slide').next('.slide').length) {
    $(".slide.on").removeClass("on").addClass("off").attr("aria-hidden", "true");
    $(nextItem).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $("#ig-next").addClass("limit");
  }
  else {
    $(".slide.on").removeClass("on").addClass("off").attr("aria-hidden", "true");
    $(nextItem).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $("#ig-next").removeClass("limit");
  }
});

$("#ig-previous").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var prevItem = $(".slide.on").prev();
  var prevItemId = $(prevItem).attr("id");

  $("#ig-next").removeClass("limit");
  $("#ig-previous").removeClass("limit");

  $(".slide-control").removeClass("current").attr("aria-expanded", "false");
  $("#" + prevItemId + "-control").addClass("current").attr("aria-expanded", "true");
  $(".lightbox-container").removeClass("backdrop");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");

  if(!$(".slide.on").prev('.slide').prev('.slide').prev('.slide').length) {
    $(".slide.on").removeClass("on").addClass("off").attr("aria-hidden", "true");
    $(prevItem).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $("#ig-previous").addClass("limit");
  }
  else {
    $(".slide.on").removeClass("on").addClass("off").attr("aria-hidden", "true");
    $(prevItem).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $("#ig-previous").removeClass("limit");
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
