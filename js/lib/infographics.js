$(".js-btn-next").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var next = $(this).attr('href');
  if ($(next).hasClass("off")) {
    $(".slide").addClass("off");
    $(next).removeClass("off");
  }
});

$(".js-btn-previous").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var previous = $(this).attr('href');
  if ($(previous).hasClass("off")) {
    $(".slide").addClass("off");
    $(previous).removeClass("off");
  }
});
