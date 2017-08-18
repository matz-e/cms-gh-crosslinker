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
  var text;
  $(this).contents().each(function() {
    if (this.nodeType == 3) {
      text = this;
    }
  });

  var html = $(text).text();
  var fullmatch = html.match(/(([^>\/]+\/){2}(interface|src)\/.+.h)/g);
  var cell = $(this).closest("td");

  if (fullmatch) {
    var h = fullmatch[0];
    var cc = h.replace(/.h$/, ".cc").replace("/interface/", "/src/");

    $(text).wrap($("<a/>").attr("href", baseurl + h));

    $.ajax({
      "url": baseurl + cc,
      "success": function() {
        cell.append($("<a>.cc</a>").attr("href", baseurl + cc));
        $(cell).children().last().wrap($("<span/>").attr("class", "pl-c"));
        $(cell).children().last().prepend(" (");
        $(cell).children().last().append(")");
      }
    });

    return;
  }

  var localmatch = html.match(/([^>\/]+\.h)/g);
  if (localmatch) {
    var h = localmatch[0];
    var cc = h.replace(/.h$/, ".cc").replace("/interface/", "/src/");

    $.ajax({
      "url": localurl + h,
      "success": function() {
        $(text).wrap($("<a/>").attr("href", localurl + h));

        // header available - is the source?
        $.ajax({
          "url": localurl + cc,
          "success": function() {
            cell.append($("<a>.cc</a>").attr("href", localurl + cc));
            $(cell).children().last().wrap($("<span/>").attr("class", "pl-c"));
            $(cell).children().last().prepend(" (");
            $(cell).children().last().append(")");
          },
          "failure": function() {
            url = localurl.replace("/interface/", "/src/")
            $.ajax({
              "url": url + cc,
              "success": function() {
                cell.append($("<a>.cc</a>").attr("href", url + cc));
                $(cell).children().last().wrap($("<span/>").attr("class", "pl-c"));
                $(cell).children().last().prepend(" (");
                $(cell).children().last().append(")");
              }
            });
          }
        });
      }
    });
  }
});
