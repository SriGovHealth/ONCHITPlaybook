$(".ig-nav").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href');
  if ($(target).hasClass("off")) {
    $(".slide").addClass("off").attr("aria-hidden", "true").attr("tabindex", "");
    $(target).removeClass("off").attr("aria-hidden", "false");
  }
});
