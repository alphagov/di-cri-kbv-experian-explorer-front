require("dotenv").config();

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  serviceConfig.coreBackAPIUrl = appEnv.getServiceURL("core-back-api");
}

module.exports = {
  API_BASE_URL: serviceConfig.coreBackAPIUrl || process.env.API_BASE_URL,
  AUTH_PATH: "/authorize",
  EXTERNAL_WEBSITE_HOST: process.env.EXTERNAL_WEBSITE_HOST,
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  VERIFICATION_API_BASE_URL:
    process.env.VERIFICATION_API_BASE_URL || "http://localhost:5007",
  VERIFICATION_API_IDENTITY_VERIFICATION_PATH: "/identity-verification",
  KBV_API_BASE_URL:
    process.env.KBV_API_BASE_URL || "http://kbv-api:5007",
  VERIFICATION_API_IDENTITY_VERIFICATION_PATH: "/identity-verification",
  KBV_API_AUTHENTICATION_PATH: "/saa",
};
