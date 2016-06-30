var url = window.location.href;
var baseurl = url.replace(
  /(([^>\/]+\/){2}(interface|src|plugins)\/.+.(h|cc))/g,
  ""
);

$(".pl-s").each(function() {
  var html = $(this).html();
  var matches = html.match(/(([^>\/]+\/){2}(interface|src)\/.+.h)/g);

  if (!matches)
    return;

  var h = matches[0];
  var cc = h.replace(/.h$/, ".cc").replace("/interface/", "/src/");

  $(this).html(html.replace(h, "<a href=\"" + baseurl + h + "\">" + h + "</a>"));

  var cell = $(this).closest("td");

  if (h.includes("/interface/")) {
    $.ajax({
      "url": baseurl + cc,
      "success": function() {
        cell.append("<span class=\"pl-c\"> (<a href=\"" + baseurl + cc + "\">.cc</a>)</span>");
      }
    });
  }
});
