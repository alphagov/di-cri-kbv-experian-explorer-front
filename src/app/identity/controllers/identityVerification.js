const BaseController = require("hmpo-form-wizard").Controller;
const axios = require("axios");

const {
  VERIFICATION_API_BASE_URL,
  VERIFICATION_API_IDENTITY_VERIFICATION_PATH,
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
        `${VERIFICATION_API_BASE_URL}${VERIFICATION_API_IDENTITY_VERIFICATION_PATH}`,
        formValues
      );

      req.session.identity = req.session.identity || {};
      req.session.identity.verificationData = identityVerificationResponse.data;

      const clientResponsePayload =
        identityVerificationResponse.data.clientResponsePayload;

      clientResponsePayload.decisionElements =
        clientResponsePayload.decisionElements.map((decisionElement) => {
          // console.log(
          //   JSON.stringify(
          //     JSON.parse(decisionElement?.otherData?.response),
          //     null,
          //     2
          //   )
          // );

          console.log(typeof decisionElement?.otherData?.response);
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
