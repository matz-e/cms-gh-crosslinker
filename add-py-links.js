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

  var text;
  $(cell).contents().each(function() {
    if (this.nodeType == 3 && $(this).text().trim() == path.join('.')) {
      text = this;
    }
  });

  path.splice(2, 0, 'python');
  var py = path.join('/') + '.py';
  var pypath = $(text).text().trim();
  var prespace = $(text).text().match(/^\s*/)[0];
  var postspace = $(text).text().match(/\s*$/)[0];

  $.ajax({
    "url": baseurl + py,
    "success": function() {
      var link = $("<a>" + pypath + "</a>").attr("href", baseurl + py);
      $(text).replaceWith(link);
      $(link).before(prespace);
      $(link).after(postspace);
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
