
// scroll spy
$(function domReady($) {
  // for each element with the class 'color'
  $('.section-header').each(function eachElement() {
    // cache the jQuery object
    var $this = $(this);
    var position = $this.position();
    $this.scrollspy({
      min: position.top,
      max: position.top + $this.height(),
      onEnter: function onEnter(element/*, position*/) {
        // Change nav highlight on scroll
        var hash = $this.attr('id');
        var matchHash = window.location.pathname + "#" + hash;

        $('.subnav li a').each(function(){
          var myHref = $(this).attr('href');
          if (matchHash === myHref) {
            $('.has-subnav').removeClass("current");
            $('.subnav li a').removeClass("now");
            $(this).addClass("now");
          }
        });

        if (hash === "intro") {
          $('.subnav li a').removeClass("now");
          $('.has-subnav.active').addClass("current");
        }
      },
      onLeave: function onLeave(element/*, position*/) {
      }
    });
  });
});



$(".content-slide-prev").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  var prevItem = $(".content-slide.on").prev();

  $(".content-slide-prev").removeClass("limit");
  $(".content-slide-next").removeClass("limit");
  $(".content-slide-restart").addClass("limit");

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
  $(".content-slide-restart").addClass("limit");

  if(!$(".content-slide.on").next('.content-slide').next('.content-slide').length) {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(nextItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-next").addClass("limit");
    $(".content-slide-restart").removeClass("limit");
  }
  else {
    $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
    $(nextItem).addClass("on").attr("aria-hidden", "false");
    $(".content-slide-next").removeClass("limit");
    $(".content-slide-restart").addClass("limit");
  }
});

$(".content-slide-restart").click(function (event) {
  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  $(".content-slide-prev").addClass("limit");
  $(".content-slide-next").removeClass("limit");
  $(".content-slide-restart").addClass("limit");

  $(".content-slide.on").removeClass("on").attr("aria-hidden", "true");
  $("#content-slide-1").addClass("on").attr("aria-hidden", "false");

});



$(".sticky-header").stick_in_parent();

//$('.hotspot-link').colorbox({inline:true, maxHeight:'95%', maxWidth:'95%'});
//$('.expand-control').colorbox({maxHeight:'95%', maxWidth:'95%'});
//$('.expand-thumbnail').colorbox({maxHeight:'95%', maxWidth:'95%'});

/* 4. Tab Interface
-----------------------------------------------------------------------------------------
*/

// The class for the container div

var $container = '.mythreality';

// Change focus between tabs with arrow keys

$('[role="tab"]').on('keydown', function(event) {

  // define current, previous and next (possible) tabs

  var $original = $(this);
  var $prev = $(this).parent('li').prev().children('[role="tab"]');
  var $next = $(this).parent('li').next().children('[role="tab"]');
  var $target;
  var containerId = $(this).parent().parent().parent().attr("id");
  // find the direction (prev or next)

  switch (event.keyCode) {
    case 37:
      $target = $prev;
      break;
    case 39:
      $target = $next;
      break;
    default:
      $target = false;
      break;
  }

  if ($target.length) {
      $original.attr({
        'tabindex' : '-1',
        'aria-selected' : false
      });
      $target.attr({
        'tabindex' : '0',
        'aria-selected' : true
      }).focus();
  }

  // Hide panels

  $('#' + containerId +' [role="tabpanel"]').attr('aria-hidden', 'true');

  // Show panel which corresponds to target

  $('#' + $(document.activeElement).attr('href').substring(1))
    .attr('aria-hidden', 'false');

});

// Handle click on tab to show + focus tabpanel

$('[role="tab"]').on('click', function(event) {

  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  // get container id
  var containerId = $(this).parent().parent().parent().attr("id");

  // remove focusability [sic] and aria-selected

  $('#' + containerId + ' [role="tab"]').attr({
    'tabindex': '-1',
    'aria-selected' : false
  });

  // replace above on clicked tab

  $(this).attr({
    'aria-selected' : true,
    'tabindex' : '0'
  });

  // Hide panels

    $('#' + containerId +' [role="tabpanel"]').attr('aria-hidden', 'true');

  // show corresponding panel

  $('#' + $(this).attr('href').substring(1))
    .attr('aria-hidden', 'false');

});

// Change focus between tabs with toggle-button

$('.mythreality-toggle').on('keydown', function(event) {

  if (event.keyCode === 13) {

    if (event.preventDefault) { event.preventDefault(); }
    else { event.returnValue = false; } // IE

    // get id of parent container
    var containerId = $(this).parent().parent().parent().parent().attr("id");

    // remove focusability [sic] and aria-selected

    $('#' + containerId + ' [role="tab"]').attr({
      'aria-selected' : false
    });

    // replace above on clicked tab

    $('li' + ' [aria-controls="' + $(this).attr('href').substring(1) + '"]').attr({
      'aria-selected' : true,
    });

    // Hide panels

    $('#' + containerId + ' [role="tabpanel"]').attr('aria-hidden', 'true');

    // show corresponding panel

    $('#' + $(this).attr('href').substring(1))
      .attr('aria-hidden', 'false');

  }

});

// Handle click on tab to show + focus tabpanel

$('.mythreality-toggle').on('click', function(event) {

  if (event.preventDefault) { event.preventDefault(); }
  else { event.returnValue = false; } // IE

  // get id of parent container
  var containerId = $(this).parent().parent().parent().parent().attr("id");

  // remove focusability [sic] and aria-selected

  $('#' + containerId + ' [role="tab"]').attr({
    'aria-selected' : false
  });

  // replace above on clicked tab

  $('li' + ' [aria-controls="' + $(this).attr('href').substring(1) + '"]').attr({
    'aria-selected' : true,
  });

  // Hide panels

  $('#' + containerId + ' [role="tabpanel"]').attr('aria-hidden', 'true');

  // show corresponding panel

  $('#' + $(this).attr('href').substring(1))
    .attr('aria-hidden', 'false');

});
