/*! jumplink.js - v0.0.1 - https://github.com/communicatehealth/jumplink.js - License: MIT */
// Adjustable scroll point padding above anchor (in pixels)
var padTop = 100;

// When loading page that has an existing fragment identifier (#),
// wait until page load is complete + 20ms delay, then trigger jumpLink function
window.addEventListener("load", function(){
  jumpLinkDelay();
  // document.body might not be ready until after window load event
  jumpLinkInitTargets();
  document.body.addEventListener("mouseout", jumpLinkPageOut, false);
  document.body.addEventListener("mouseover", jumpLinkPageOver, false);
}, false);

// Clicking in-page fragment identifier (#) links, triggers
// onhashchange, triggering jumpLink function
window.addEventListener("hashchange", jumpLink, false);

// Keep track if we're on page when hashchange occurs, to detect back/forward buttons
var jumpLinkHistory = {
  onPage: true,
  hashes: [],
  index: -1,
  positions: [],
};
function jumpLinkPageOut() {
  jumpLinkHistory.onPage = false;
}
function jumpLinkPageOver() {
  jumpLinkHistory.onPage = true;
}

// Keep track of scrolling if target is in a scrolling container
function jumpLinkTargetOnScroll()  {
  if(jumpLinkHistory.index === -1) {
    jumpLinkHistory.index = 0;
    jumpLinkHistory.positions.push({parent:null,top:0});
    jumpLinkHistory.hashes.push(window.location.hash);
  }
  var position = jumpLinkHistory.positions[jumpLinkHistory.index];
  position.parent = this;
  position.top = this.scrollTop;
}

// Click handler for links to targets in scrolling containers
function jumpLinkOnClick(e)
{
  if (!e) {
    e = window.event;
  }

  //IE9 & Other Browsers
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  //IE8 and Lower
  else {
    e.cancelBubble = true;
  }

  window.history.pushState("","",this.href);

  // Reset forward looking history in case back button recently used
  jumpLinkHistory.positions = jumpLinkHistory.positions.slice(0,jumpLinkHistory.index+1);
  jumpLinkHistory.hashes = jumpLinkHistory.hashes.slice(0,jumpLinkHistory.index+1);
  // And push a new history item
  jumpLinkHistory.positions.push({parent:null,top:0});
  jumpLinkHistory.hashes.push(window.location.hash);
  jumpLinkHistory.index = jumpLinkHistory.positions.length - 1;

  jumpLink();
  return false;
}

// Find links to targets in scrolling containers
function jumpLinkInitTargets(){
  var links = document.getElementsByTagName("a");
  var firstTarget = null;
  for(var i=0;i<links.length;++i){
    var link = links[i];
    var href = link.getAttribute("href");
    if(href.indexOf("#")===0){
      var target = document.getElementById(href.substr(1));
      var scrollingContainer = false;
      var overflow;
      if(target) {
        while ((target = target.parentNode) && target !== document.body) {
          overflow = getStyle(target, "overflow");
          if (overflow === "auto" || overflow === "scroll") {
             scrollingContainer = true;
             firstTarget = target;
             break;
          }
          overflow = getStyle(target, "overflow-y");
          if (overflow === "auto" || overflow === "scroll") {
             scrollingContainer = true;
             firstTarget = target;
             break;
          }
        }
        if(scrollingContainer){
          target.onscroll = jumpLinkTargetOnScroll;
          link.onclick = jumpLinkOnClick;
        }
      }
    }
  }
  if(firstTarget){
    // And push a new history item
    jumpLinkHistory.positions.push({parent:firstTarget,top:firstTarget.scrollTop});
    jumpLinkHistory.hashes.push(window.location.hash);
    jumpLinkHistory.index = jumpLinkHistory.positions.length - 1;
  }
}

function jumpLinkDelay () {
  if (window.location.hash) {
    setTimeout(jumpLink, 20);
  }
}

function jumpLink() {

  if(jumpLinkHistory.onPage) {

    if (window.location.hash) {

      // Grab fragment identifier from URL
      var id = window.location.hash.substring(1);

      // Check for valid fragment identifier (A-Z, 0-9, _, -)
      if (!(/^[A-z0-9_\-]+$/.test(id))) {
        return;
      }

      // Find target in document from fragment identifier value
      var element = document.getElementById(id);

      // Get vertical position of id referenced in fragment identifier
      var offset = findPos(element);
      var offsetTop = offset[1];
      var offsetParent = offset.parent;

      if (offsetTop) {

        if(!offsetParent || offsetParent === document.body) {

          // Apply scroll point padding
          var adjustedTop = offsetTop - padTop;

          // Avoid negative position number after padding
          if (adjustedTop <= 1) {
            adjustedTop = 0;
          }

          window.scrollTo(0, adjustedTop);

          // Store information for back/forward buttons
          jumpLinkHistory.positions.push({element:element,top:window.scrollTop,parent:offsetParent});
          jumpLinkHistory.hashes.push(window.location.hash);


        } else {

          var relOffset = findRelativePos(element,offsetParent);

          var adjustedTop2 = relOffset[1] - padTop;
          if (adjustedTop2 <= 1) {
            adjustedTop2 = 0;
          }
          setTimeout(function(){
            offsetParent.scrollTop = adjustedTop2;
          },50);
        }
      }

      if (element) {

        // Set tabindex of target id to -1 for tab focus (accessibility
        // improvement) and avoid setting tab index on links or
        // form elements that may already have specific tabindex values.
        // "jumplink-ignore" is an optional class name to avoid tabindex change
        if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) && !(/^(?:jumplink-ignore)$/i.test(element.className))) {
          element.tabIndex = -1;
        }

        // Apply visual focus to target
        element.focus();
      }
    }
  }
  else // this is a back or forward button event
  {
    var jumped = false;
    // did we press the back button?
    if(jumpLinkHistory.index-1 >=0 && jumpLinkHistory.hashes[jumpLinkHistory.index-1] === window.location.hash){
      jumped = true;
      --jumpLinkHistory.index;
    }
    // did we press the forward button?
    else if(jumpLinkHistory.index + 1 < jumpLinkHistory.hashes.length && jumpLinkHistory.hashes[jumpLinkHistory.index+1] === window.location.hash){
      jumped = true;
      ++jumpLinkHistory.index;
    }
    else {
      // We don't have history -- maybe the page reloaded.
      jumpLinkHistory.onPage = true;
      jumpLink();
    }
    if(jumped && jumpLinkHistory.index >= 0) {
       var position = jumpLinkHistory.positions[jumpLinkHistory.index];
       position.parent.scrollTop = position.top;
    }
  }
}


// http://www.greywyvern.com/?post=331
// http://www.quirksmode.org/js/findpos.html
// Added check for parent element with overflow:scroll and return of parent
function findPos(obj) {
  var curleft = 0;
  var curtop = 0;
  var scr = obj;
  var fixed = false;
  var overflow;
  while ((scr = scr.parentNode) && scr !== document.body) {
    curleft -= scr.scrollLeft || 0;
    curtop -= scr.scrollTop || 0;
    if (getStyle(scr, "position") === "fixed") { fixed = true; }
    overflow = getStyle(scr, "overflow");
    if (overflow === "auto" || overflow === "scroll") { break; }
    overflow = getStyle(scr, "overflow-y");
    if (overflow === "auto" || overflow === "scroll") { break; }
  }
  if (fixed && !window.opera) {
    var scrDist = scrollDist();
    curleft += scrDist[0];
    curtop += scrDist[1];
  }
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while ((obj = obj.offsetParent) !== null);
  return {0:curleft, 1:curtop, parent:scr};
}

function findRelativePos(obj,parent) {
  var curleft = 0;
  var curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while ((obj = obj.offsetParent) !== null && obj !== parent);
  return [curleft, curtop];
}

function scrollDist() {
  var html = document.getElementsByTagName('html')[0];
  if (html.scrollTop && document.documentElement.scrollTop) {
    return [html.scrollLeft, html.scrollTop];
  }
  else if (html.scrollTop || document.documentElement.scrollTop) {
    return [
      html.scrollLeft + document.documentElement.scrollLeft,
      html.scrollTop + document.documentElement.scrollTop
    ];
  }
  else if (document.body.scrollTop) {
    return [document.body.scrollLeft, document.body.scrollTop];
  }
  return [0, 0];
}

function getStyle(obj, styleProp) {
  var y;
  if (obj.currentStyle) {
    y = obj.currentStyle[styleProp];
  }
  else if (window.getComputedStyle) {
    y = window.getComputedStyle(obj, null)[styleProp];
  }
  return y;
}
