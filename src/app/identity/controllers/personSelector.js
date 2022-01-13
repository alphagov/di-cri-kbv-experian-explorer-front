const BaseController = require("hmpo-form-wizard").Controller;

class PersonSelectorController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
            callback(null, locals);
        });
    }

    async saveValues(req, res, next) {
        const selectedOption = req.body.preConfiguredValues;
        const preConfiguredValue = preConfiguredData[selectedOption];

        req.sessionModel.set("dateOfBirth",preConfiguredValue.dateOfBirth);
        req.sessionModel.set("givenNames",preConfiguredValue.firstName);
        req.sessionModel.set("surname",preConfiguredValue.surname);
        req.sessionModel.set("title",preConfiguredValue.title);
        req.sessionModel.set("houseNameNumber",preConfiguredValue.addresses[0].houseNameNumber);
        req.sessionModel.set("streetName",preConfiguredValue.addresses[0].street);
        req.sessionModel.set("townCity",preConfiguredValue.addresses[0].townCity);
        req.sessionModel.set("postCode",preConfiguredValue.addresses[0].postcode);
        // req.sessionModel.set("addresses",preConfiguredValue.addresses);

        super.saveValues(req, res, next);
    }
}

const preConfiguredData = {
    "arkilAlbert": {
        firstName: "albert",
        surname: "arkil",
        title: "mr",
        dateOfBirth: "1948-07-16",
        addresses: [
                {
                addressType: "CURRENT",
                street: "Stocks Hill",
                townCity: "Workingham",
                houseNameNumber: 3,
                postcode: "CA14 5PH"
            }
        ]
    },
    "duffLinda": {
        firstName: "Linda",
        surname: "Duff",
        title: "Miss",
        dateOfBirth: "1990-11-12",
        addresses: [
            {
                addressType: "CURRENT",
                street: "Hand Avenue",
                townCity: "Leicester",
                houseNameNumber: 198,
                postcode: "LE3 1SL"
            }
        ],
    },
    "pragnallGary": {
        firstName: "Gary",
        surname: "Pragnall",
        title: "Mr",
        dateOfBirth: "1962-07-15",
        addresses: [
            {
                addressType: "CURRENT",
                street: "Norwich Road",
                townCity: "Norwich",
                houseNameNumber: "Brooke Post Office 4",
                postcode: "N15 1AB"
            }
        ],
    },
    "ramachandranKatherine": {
        firstName: "Katherine",
        surname: "Ramachandran",
        title: "Miss",
        dateOfBirth: "1979-07-20",
        addresses: [{
            addressType: "CURRENT",
            street: "Lime tree avenue",
            townCity: "Nottingham",
            postcode: "NG8 6AB"
        }]
    }

};

module.exports = PersonSelectorController;
