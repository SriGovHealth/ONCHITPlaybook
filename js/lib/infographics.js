$(".ig-nav").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  $("#ig-next").removeClass("limit");
  $("#ig-previous").removeClass("limit");
  $(".lightbox-container").removeClass("backdrop");
  $(".slide").removeClass("backdrop-on");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");
  if($(this).hasClass("btn-start")) {
    $(this).attr("aria-expanded", "true");
  }

  var target = $(this).attr('href');

  if ($(target).hasClass("off")) {
    $(".slide").addClass("off").removeClass("on").attr("aria-hidden", "true");
    $(target).removeClass("off").addClass("on").attr("aria-hidden", "false");
    $(".slide-control").removeClass("current").attr("aria-selected", "false").attr("tabindex", "-1");
    $(target + "-control").addClass("current").attr("aria-selected", "true").attr("tabindex", "0");
  }

  if(!$(".slide.on").next('.slide').length) {
    $("#ig-next").addClass("limit");
  }

  if(!$(".slide.on").prev('.slide').length) {
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

  $(".slide-control").removeClass("current").attr("aria-selected", "false").attr("tabindex", "-1");
  $("#" + nextItemId + "-control").addClass("current").attr("aria-selected", "true").attr("tabindex", "0");
  $(".lightbox-container").removeClass("backdrop");
  $(".slide").removeClass("backdrop-on");
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

  $(".slide-control").removeClass("current").attr("aria-selected", "false").attr("tabindex", "-1");
  $("#" + prevItemId + "-control").addClass("current").attr("aria-selected", "true").attr("tabindex", "0");
  $(".lightbox-container").removeClass("backdrop");
  $(".slide").removeClass("backdrop-on");
  $(".lightbox-content").addClass("lightbox-off").attr("aria-hidden", "true");

  if(!$(".slide.on").prev('.slide').prev('.slide').length) {
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

$('.infographic-container [role="tab"]').on('keydown', function(e) {
  var $container = '.infographic-container';
  var $original = $(this);
  var $prev = $(this).parents('li').prev().children('[role="tab"]');
  var $next = $(this).parents('li').next().children('[role="tab"]');
  var $target;

  $("#ig-next").removeClass("limit");
  $("#ig-previous").removeClass("limit");


  // find the direction (prev or next)

  switch (e.keyCode) {
    case 37:
      $target = $prev;
      if(!$(".slide.on").prev('.slide').prev('.slide').length) {
        $("#ig-previous").addClass("limit");
      }
      break;
    case 39:
      $target = $next;
      if(!$(".slide.on").next('.slide').next('.slide').length) {
        $("#ig-next").addClass("limit");
      }
      break;
    default:
      $target = false;
      break;
  }

  if ($target.length) {
      $original.attr({
        'tabindex' : '-1',
        'aria-selected' : false
      }).removeClass('current');
      $target.attr({
        'tabindex' : '0',
        'aria-selected' : true
      }).addClass('current').focus();

      // Hide panels

      $($container +' .slide')
        .attr('aria-hidden', 'true').addClass('off').removeClass('on').removeClass('backdrop-on');
      $(".lightbox-content").addClass("lightbox-off").removeClass("lightbox-on").attr("aria-hidden", "true");
      $(".lightbox-container").removeClass("backdrop");

      // Show panel which corresponds to target

      $($($target).attr('href'))
        .attr('aria-hidden', 'false').removeClass('off').addClass('on');
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
    $(".slide.on").addClass("backdrop-on");
    $(target).removeClass("lightbox-off").addClass("lightbox-on").attr("aria-hidden", "false");
  }

  if(!$(".lightbox-content.lightbox-on").prev('.lightbox-content').length) {
    $("#lightbox-nav-previous").addClass("limit");
  }

  if(!$(".lightbox-content.lightbox-on").next('.lightbox-content').length) {
    $("#lightbox-nav-next").addClass("limit");
  }
});

$(".small-lightbox-toggle a").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  $("#lightbox-nav-next").removeClass("limit");
  $("#lightbox-nav-previous").removeClass("limit");

  var target = $(this).attr('href');
  if ($(target).hasClass("lightbox-off")) {
    $(".lightbox-content").addClass("lightbox-off").removeClass("lightbox-on").attr("aria-hidden", "true");
    $(".lightbox-container").addClass("backdrop");
    $(".slide.on").addClass("backdrop-on");
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
  $(".slide").removeClass("backdrop-on");
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

$("#screen-view-toggle").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  if($("#screen-view").hasClass("patient")) {
    $("#screen-view").removeClass("patient");
    $("#screen-view").addClass("caregiver");
    $("#screen-view-toggle").text("See patient view");
  }
  else {
    $("#screen-view").removeClass("caregiver");
    $("#screen-view").addClass("patient");
    $("#screen-view-toggle").text("See caregiver view");
  }
});

$(".patient-quote-toggle").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href');
  $(this).attr("aria-expanded", "true");
  $(target).removeClass("off").addClass("on").attr("aria-hidden", "false");

});

$(".patient-quote-close").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href') + "-patient-quote";
  var toggle = $(this).attr('href') + "-patient-quote-toggle";
  $(target).removeClass("on").addClass("off").attr("aria-hidden", "true");
  $(toggle).attr("aria-expanded", "false");
});
