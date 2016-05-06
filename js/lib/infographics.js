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

  $("#lightbox-nav-next").removeClass("limit");
  $("#lightbox-nav-previous").removeClass("limit");

  var target = $(this).attr('href');
  if ($(target).hasClass("lightbox-off")) {
    $(".lightbox-content").addClass("lightbox-off").removeClass("lightbox-on").attr("aria-hidden", "true");
    $(".lightbox-container").addClass("backdrop");
    $(target).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
  }

  if(!$(".lightbox-content.lightbox-on").prev('.lightbox-content').length) {
    $("#lightbox-nav-previous").addClass("limit");
  }

  if(!$(".lightbox-content.lightbox-on").next('.lightbox-content').length) {
    $("#lightbox-nav-next").addClass("limit");
  }
});


$(".lightbox-close").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE
  $(".lightbox-container").removeClass("backdrop");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");
});


$("#lightbox-nav-previous").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var prevLightbox = $(".lightbox-content.lightbox-on").prev();
  var prevLightboxId = $(prevLightbox).attr("id");

  $("#lightbox-nav-next").removeClass("limit");
  $("#lightbox-nav-previous").removeClass("limit");

  if(!$(".lightbox-content.lightbox-on").prev('.lightbox-content').prev('.lightbox-content').length) {
    $(".lightbox-content.lightbox-on").removeClass("lightbox-on").addClass("lightbox-off").attr("aria-hidden", "true");
    $(prevLightbox).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
    $("#lightbox-nav-previous").addClass("limit");
  }
  else {
    $(".lightbox-content.lightbox-on").removeClass("lightbox-on").addClass("lightbox-off").attr("aria-hidden", "true");
    $(prevLightbox).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
    $("#lightbox-nav-previous").removeClass("limit");
  }
});

$("#lightbox-nav-next").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var nextLightbox = $(".lightbox-content.lightbox-on").next();
  var nextLightboxId = $(nextLightbox).attr("id");

  $("#lightbox-nav-next").removeClass("limit");
  $("#lightbox-nav-previous").removeClass("limit");

  if(!$(".lightbox-content.lightbox-on").next('.lightbox-content').next('.lightbox-content').length) {
    $(".lightbox-content.lightbox-on").removeClass("lightbox-on").addClass("lightbox-off").attr("aria-hidden", "true");
    $(nextLightbox).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
    $("#lightbox-nav-next").addClass("limit");
  }
  else {
    $(".lightbox-content.lightbox-on").removeClass("lightbox-on").addClass("lightbox-off").attr("aria-hidden", "true");
    $(nextLightbox).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
    $("#lightbox-nav-next").removeClass("limit");
  }

});


