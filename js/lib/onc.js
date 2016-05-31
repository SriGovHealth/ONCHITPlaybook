// Scrolling URL update, nav state change
var topHash = "#intro";
var currentHash = "#top";
$(document).scroll(function () {
  $('.section-header').each(function () {
    var top = window.pageYOffset;
    var distance = top - $(this).offset().top;
    var hash = $(this).attr('id');
    var path = window.location.pathname + window.location.hash;
    var prevHash = $(this).prevAll('.section-header:first').attr('id');

    if (distance < 30 && distance > -30 && currentHash !== hash) {
      history.replaceState({page: 1}, hash, "#" + hash);
      currentHash = hash;
      path = window.location.pathname + window.location.hash;

      $('.subnav li a').each(function(){
        var myHref = $(this).attr('href');
        if (path === myHref) {
          $('.has-subnav').removeClass("current");
          $('.subnav li a').removeClass("now");
          $(this).addClass("now");
        }
      });
    }

    /*else if (distance < -30 && currentHash === hash) {
      if (typeof prevHash !== 'undefined') {
        path = window.location.pathname + "#" + prevHash;

        $('.subnav li a').each(function(){
          var myHref = $(this).attr('href');
          if (path === myHref) {
            $('.has-subnav').removeClass("current");
            $('.subnav li a').removeClass("now");
            $(this).addClass("now");
          }
        });
      }
    }*/

    if (path.indexOf(topHash) > -1) {
      $('.has-subnav').each(function(){
        if ($(this).hasClass('active')) {
          $(this).addClass('current');
        }
      });
      $('.subnav li a').removeClass("now");
    }
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
