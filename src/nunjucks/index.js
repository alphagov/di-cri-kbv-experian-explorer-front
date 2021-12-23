const filters = require("./filters");
const globals = require("./globals");
module.exports = {
  setup: (env) => {
    globals(env);
    filters(env);
  },
};
