var self = require("sdk/self");
var pageMod = require("sdk/page-mod")

pageMod.PageMod({
  include: [
    /.*github\.com\/[^\/]*\/cmssw\/.*(\.cc|\.h)/
  ],
  contentScriptFile: [
    self.data.url("zepto.min.js"),
    self.data.url("add-links.js")
  ]
});

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
