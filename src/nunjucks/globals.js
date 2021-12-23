const debug = require("debug")("app:nunjucks:globals");
const hmpoComponentsGlobals = require("hmpo-components/lib/globals");

module.exports = (nunjucks) => {
  debug("adding app globals");

  nunjucks.addGlobal("getContext", function () {
    return {
      keys: Object.keys(this.ctx),
      ctx: this.ctx.ctx,
    };
  });

  nunjucks.addGlobal("isObject", function (value) {
    // console.log(value);
    // console.log(typeof value);
    return "object" === typeof value;
  });

  nunjucks.addGlobal("isArray", function (value) {
    // console.log(value);
    return Array.isArray(value);
  });

  nunjucks.addGlobal(
    "hmpoGetOptions",
    function (ctx, params, type, optional = false) {
      debug(ctx);
      debug(params);
      debug(type);

      hmpoComponentsGlobals.globals.hmpoGetOptions(ctx, params, type, optional);
    }
  );
};
