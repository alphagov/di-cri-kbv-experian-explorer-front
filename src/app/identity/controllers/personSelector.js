const BaseController = require("hmpo-form-wizard").Controller;

class PersonSelectorController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
            console.log("Im here");
            // TODO move names to file and import them
            locals.preConfiguredValues = [
                {
                    key: "",
                    firstName: "",
                    surname: "",
                    title: "mr",
                    dateOfBirth: "1948-07-16",
                    addresses: [
                        {
                            addressType: "CURRENT",
                            street: "",
                            townCity: "",
                            houseNameNumber: 3,
                            postcode: ""
                        }
                    ],
                }
            ]

            callback(null, locals);
        });
    }
    

}

module.exports = PersonSelectorController;