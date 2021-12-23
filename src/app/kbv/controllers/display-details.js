const BaseController = require("hmpo-form-wizard").Controller;

class DoneController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      console.log(req.sessionModel.toJSON());

      callback(err, locals);
    });
  }
}

module.exports = DoneController;
