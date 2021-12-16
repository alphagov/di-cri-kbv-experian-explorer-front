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

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      const requestValue = req.sessionModel.toJSON();
      delete requestValue["csrf-secret"];

      locals.valuesSummaryList = Object.entries(requestValue).map(
        this.mapItemToSummaryListRow
      );

      callback(null, locals);
    });
  }
}

module.exports = PassportDetailsController;
