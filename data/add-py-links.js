var url = window.location.href;
var baseurl = url.replace(
  /(([^>\/]+\/){2}(python|test|scripts)\/.+.(py)(#.*)?)/g,
  ""
);
var localurl = url.replace(
  /[^\/]+\.(py)(#.*)?$/g,
  ""
);

function addPyPath(cell, pyload) {
  var path = pyload.split('.');
  if (path.length < 3)
    return

  path.splice(2, 0, 'python');
  var py = path.join('/') + '.py';
  var html = cell.html();

  $.ajax({
    "url": baseurl + py,
    "success": function() {
      cell.html(html.replace(pyload, "<a href=\"" + baseurl + py + "\">" + pyload + "</a>"));
    }
  });
}

$(".pl-k").each(function() {
  var cell = $(this).parent("td");
  var html = cell.html();
  if (!html)
    return;

  var match = html.match(/(from|import)\<\/span>\s*((\w+\.?)+)/);

  if (!match)
    return;

  if (match[1] != $(this).html())
    return;

  addPyPath(cell, match[2]);
});

$(".pl-s").each(function() {
  var cell = $(this).parent("td");
  var text = cell.text();

  var match = text.match(/process\.load\("((\w+\.?)+)"\)/);

  if (!match)
    return;

  addPyPath(cell, match[1]);
});
