# CMS Github Crosslinker

Adds links to the [CMSSW Github page](https://github.com/cms-sw/cmssw) and
forks thereof.  The following links are created:

* C++ header files referenced with `#include`
* C++ source files in conventional locations, if a matching header is found
  for an `#include`
* Python files, if imported using the full path or via `process.load`
