const BaseController = require("hmpo-form-wizard").Controller;

class DoneController extends BaseController {
  saveValues(req, res, next) {
    req.session.returnPath = "/kbv/display-details";
    super.saveValues(req, res, next);
  }
}

module.exports = DoneController;
