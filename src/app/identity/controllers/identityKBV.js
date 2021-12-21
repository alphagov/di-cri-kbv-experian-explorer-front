const BaseController = require("hmpo-form-wizard").Controller;
const axios = require("axios");

const {
  KBV_API_BASE_URL,
  KBV_API_AUTHENTICATION_PATH,
} = require("../../../lib/config");

class IdentityKBVController extends BaseController {
  async saveValues(req, res, next) {
    const {
      title,
      surname,
      givenNames,
      dateOfBirth,
      houseNameNumber,
      streetName: street,
      townCity,
      postCode: postcode,
    } = req.sessionModel.toJSON();

    const formValues = {
      title: title,
      firstName: givenNames,
      middleNames: null,
      surname: surname,
      dateOfBirth,
      addresses: [
        {
          houseNameNumber,
          street,
          townCity,
          postcode,
          addressType: "CURRENT",
        },
      ],
    };

    try {
      const identityVerificationResponse = await axios.post(
        `${KBV_API_BASE_URL}${KBV_API_AUTHENTICATION_PATH}`,
        formValues
      );

      req.session.identity = req.session.identity || {};
      req.session.identity.verificationData = identityVerificationResponse.data;
    } catch (e) {
      return next(e);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = IdentityKBVController;
