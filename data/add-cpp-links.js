var url = window.location.href;
var baseurl = url.replace(
  /(([^>\/]+\/){2}(interface|src|plugins)\/.+.(h|cc)(#.*)?)/g,
  ""
);
var localurl = url.replace(
  /[^\/]+\.(h|cc)(#.*)?$/g,
  ""
);

$(".pl-s").each(function() {
  var html = $(this).html();
  var fullmatch = html.match(/(([^>\/]+\/){2}(interface|src)\/.+.h)/g);

  if (fullmatch) {
    var h = fullmatch[0];
    var cc = h.replace(/.h$/, ".cc").replace("/interface/", "/src/");

    $(this).html(html.replace(h, "<a href=\"" + baseurl + h + "\">" + h + "</a>"));

    var cell = $(this).closest("td");

    $.ajax({
      "url": baseurl + cc,
      "success": function() {
        cell.append("<span class=\"pl-c\"> (<a href=\"" + baseurl + cc + "\">.cc</a>)</span>");
      }
    });

    return;
  }

  var localmatch = html.match(/([^>\/]+\.h)/g);
  if (localmatch) {
    var h = localmatch[0];
    var cc = h.replace(/.h$/, ".cc").replace("/interface/", "/src/");

    var span = $(this);
    var cell = $(this).closest("td");

    $.ajax({
      "url": localurl + h,
      "success": function() {
        span.html(html.replace(h, "<a href=\"" + localurl + h + "\">" + h + "</a>"));

        // header available - is the source?
        $.ajax({
          "url": localurl + cc,
          "success": function() {
            cell.append("<span class=\"pl-c\"> (<a href=\"" + localurl + cc + "\">.cc</a>)</span>");
          },
          "failure": function() {
            url = localurl.replace("/interface/", "/src/")
            $.ajax({
              "url": url + cc,
              "success": function() {
                cell.append("<span class=\"pl-c\"> (<a href=\"" + url + cc + "\">.cc</a>)</span>");
              }
            });
          }
        });
      }
    });
  }
});
