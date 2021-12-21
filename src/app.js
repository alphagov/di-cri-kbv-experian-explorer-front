const { PORT, SESSION_SECRET } = require("./lib/config");
const { setup } = require("hmpo-app");

const redisConfig = require("./lib/redis")();

const loggerConfig = {
  console: true,
  consoleJSON: true,
  app: false,
};

const sessionConfig = {
  cookieName: "service_session",
  secret: SESSION_SECRET,
};

const { app, router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: sessionConfig,
  redis: redisConfig,
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  dev: true,
});

app.get("nunjucks").addGlobal("getContext", function () {
  return {
    keys: Object.keys(this.ctx),
    ctx: this.ctx.ctx,
  };
});

app.get("nunjucks").addGlobal("isObject", function (value) {
  // console.log(value);
  // console.log(typeof value);
  return "object" === typeof value;
});

app.get("nunjucks").addGlobal("isArray", function (value) {
  // console.log(value);
  return Array.isArray(value);
});

router.use("/oauth2", require("./app/oauth2/router"));
router.use("/debug", require("./app/debug/router"));
router.use("/identity", require("./app/identity/router"));
