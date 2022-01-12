const BaseController = require("hmpo-form-wizard").Controller;
const axios = require("axios");

const {
  API: {
    BASE_URL,
    PATHS: { IDENTITY_CHECK },
  },
} = require("../../../lib/config");

class IdentityVerificationController extends BaseController {
  async saveValues(req, res, next) {
    const {
      surname,
      givenNames,
      dateOfBirth,
      houseNameNumber,
      streetName: street,
      townCity,
      postCode: postcode,
    } = req.sessionModel.toJSON();

    const formValues = {
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
        `${BASE_URL}${IDENTITY_CHECK}`,
        formValues
      );

      req.session.identity = req.session.identity || {};
      req.session.identity.verificationData = identityVerificationResponse.data;

      const clientResponsePayload =
        identityVerificationResponse.data.clientResponsePayload;

      clientResponsePayload.decisionElements =
        clientResponsePayload.decisionElements.map((decisionElement) => {
          return {
            ...decisionElement,
            otherData:
              decisionElement?.otherData?.response &&
              JSON.parse(decisionElement.otherData.response),
          };
        });
    } catch (e) {
      return next(e);
    }

    super.saveValues(req, res, next);
  }
}

module.exports = IdentityVerificationController;
