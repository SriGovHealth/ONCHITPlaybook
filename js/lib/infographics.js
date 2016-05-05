$(".ig-nav").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var target = $(this).attr('href');
  if ($(target).hasClass("off")) {
    $(".slide").addClass("off").attr("aria-hidden", "true");
    $(target).removeClass("off").attr("aria-hidden", "false");
    setTimeout(function() {
      $(target + " .slide-top").attr("tabindex", "-1").focus();
    }, 100);

  }
});
