const BaseController = require("hmpo-form-wizard").Controller;
const sessionModelJsonToSummaryListRow = require("../../../presenters/sessionModelJsonToSummaryListRow");
const responseHeaderToSummaryListRow = require("../../../presenters/responseHeaderToSummaryList");
const orchestrationDecisionToTable = require("../../../presenters/orchestrationDecisionsToTable");
const decisionElementsToTable = require("../../../presenters/decisionElementsToTable");
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

      locals.responseHeaderSummaryList = responseHeaderToSummaryListRow({
        responseHeader: req.session.identity.verificationData.responseHeader,
      });

      locals.responsePayloadOrchestrationDecisionTable =
        orchestrationDecisionToTable({
          orchestrationDecisions:
            req.session.identity.verificationData.clientResponsePayload
              .orchestrationDecisions,
        });

      locals.responsePayloadDecisionElementsTable = decisionElementsToTable({
        orchestrationDecisions:
          req.session.identity.verificationData.clientResponsePayload
            .decisionElements,
      });

      locals.verificationData = req.session.identity.verificationData;

      locals.debugDataHtml = hljs.default.highlight(
        `${JSON.stringify(locals.verificationData, null, 2)}`,
        { language: "json" }
      ).value;

      callback(null, locals);
    });
  }
}

module.exports = PassportDetailsController;
