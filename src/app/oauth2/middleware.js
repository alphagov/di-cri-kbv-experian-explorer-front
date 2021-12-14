const axios = require("axios");
const { API_BASE_URL, AUTH_PATH } = require("../../lib/config");

module.exports = {
  addAuthParamsToSession: async (req, res, next) => {
    const authParams = {
      response_type: req.query.response_type,
      client_id: req.query.client_id,
      state: req.query.state,
      redirect_uri: req.query.redirect_uri,
    };

    req.session.authParams = authParams;

    next();
  },


  redirectToDebugPage: async (req, res) => {
    res.redirect("/debug");
  },

  retrieveAuthorizationCode: async (req, res, next) => {
    try {
      const oauthParams = {
        ...req.session.authParams,
        scope: "openid",
      };

      const apiResponse = await axios.get(`${API_BASE_URL}${AUTH_PATH}`, {
        params: oauthParams,
      });

      const code = apiResponse?.data?.code?.value;

      if (!code) {
        res.status(500);
        return res.send("Missing authorization code");
      }

      req.authorization_code = code;

      next();
    } catch (e) {
      next(e);
    }
  },

  redirectToCallback: async (req, res) => {
    const redirectURL = `${req.session.authParams.redirect_uri}?code=${req.authorization_code}`;

    res.redirect(redirectURL);
  },
};