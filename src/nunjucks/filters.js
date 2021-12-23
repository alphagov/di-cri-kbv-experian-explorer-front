const debug = require("debug")("app:nunjucks:filters");
const hmpoComponentsFilters = require("hmpo-components/lib/filters");

module.exports = (nunjucks) => {
  debug("adding app filters");

  // nunjucks.addFilter("translate", (txt, options) => {
  //   debug(txt);
  //   debug(options);
  //
  //   return hmpoComponentsFilters.translate(txt, options);
  // });
};
