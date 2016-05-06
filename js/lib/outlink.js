/*! outlink.js - v0.0.1 - https://github.com/communicatehealth/outlink.js - License: MIT */

// Get hostname to use in alt/title text
var site = location.hostname;
if (site === "") { site = "this site"; }
site = site.replace("www.", "");

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; ++i) {
  // if URL contains .gov and doesn't contain current site URL
  if (links[i].href.indexOf(".gov") > -1 && links[i].href.indexOf(site) === -1 && links[i].className.indexOf("outlink-ignore")) {
    links[i].setAttribute("target", "_blank");
    links[i].setAttribute("rel", "noopener noreferrer");
  }

  // if URL contains http(s) and doesn't contain current site URL
  else if ((links[i].href.indexOf("http://") > -1 || links[i].href.indexOf("https://") > -1) && links[i].href.indexOf(site) === -1 && links[i].className.indexOf("outlink-ignore")) {
    links[i].setAttribute("target", "_blank");
    links[i].setAttribute("rel", "noopener noreferrer");
    links[i].innerHTML += "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAQAAACIaFaMAAAAPUlEQVR4AWMgHUz4D4FgdgOQBYVIEggphATzBEYMCZhqrEahCTcAIRaJBggb3agGFOdi8wJZEpgQvwTJAADRrod38NnIHQAAAABJRU5ErkJggg==\" style=\"padding-left: .25em;\" alt=\"External Link: You are leaving "+ site +"\" title=\"External Link: You are leaving "+ site +"\">";
  }
}
