const BaseController = require("hmpo-form-wizard").Controller;
const sessionModelJsonToSummaryListRow = require("../../../../presenters/sessionModelJsonToSummaryListRow");
const hljs = require("highlight.js");

class PassportDetailsController extends BaseController {
  extractKeyVerificationProperties(verificationData) {
    return {
      decision: verificationData?.overallReponse?.decision,
    };
  }

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      const requestValue = req.sessionModel.toJSON();
      delete requestValue["csrf-secret"];
      delete requestValue["errors"];

      locals.valuesSummaryList = sessionModelJsonToSummaryListRow({
        sessionModel: requestValue,
      });

      locals.debugDataHtml = hljs.default.highlight(
        `${JSON.stringify(requestValue, null, 2)}`,
        { language: "json" }
      ).value;

      callback(null, locals);
    });
  }
}

module.exports = PassportDetailsController;
