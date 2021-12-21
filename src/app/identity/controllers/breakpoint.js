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

      console.log(
        Object.keys(req.session.identity.verificationData.clientResponsePayload)
      );

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

      console.log(
        JSON.stringify(locals.responsePayloadOrchestrationDecisionTable)
      );
      // console.log(Object.keys(req.session.identity.verificationData));
      // console.log("responseHeader");
      // console.log(
      //   JSON.stringify(
      //     req.session.identity.verificationData.responseHeader,
      //     null,
      //     2
      //   )
      // );
      //
      // console.log("responsePayload");
      // console.log(
      //   JSON.stringify(
      //     req.session.identity.verificationData.clientResponsePayload,
      //     null,
      //     2
      //   )
      // );

      locals.verificationData = req.session.identity.verificationData;
      //
      // const clientResponsePayload =
      //   locals.verificationData.clientResponsePayload;
      //
      // clientResponsePayload.decisionElements =
      //   clientResponsePayload.decisionElements.map((decisionElement) => {
      //     // console.log(
      //     //   JSON.stringify(
      //     //     JSON.parse(decisionElement?.otherData?.response),
      //     //     null,
      //     //     2
      //     //   )
      //     // );
      //
      //     console.log(typeof decisionElement?.otherData?.response);
      //     return {
      //       ...decisionElement,
      //       otherData:
      //         decisionElement?.otherData?.response &&
      //         JSON.parse(decisionElement.otherData.response),
      //     };
      //   });

      locals.debugDataHtml = hljs.default.highlight(
        `${JSON.stringify(locals.verificationData, null, 2)}`,
        { language: "json" }
      ).value;

      callback(null, locals);
    });
  }
}

module.exports = PassportDetailsController;
