const BaseController = require("hmpo-form-wizard").Controller;

class PassportDetailsController extends BaseController {
  mapItemToSummaryListRow(item) {
    return {
      key: {
        text: item[0],
      },
      value: {
        text: item[1],
      },
    };
  }

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

      locals.valuesSummaryList = Object.entries(requestValue).map(
        this.mapItemToSummaryListRow
      );

      locals.verificationData = req.session.identity.verificationData;

      callback(null, locals);
    });
  }
}

module.exports = PassportDetailsController;
