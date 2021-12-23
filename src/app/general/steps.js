const details = require("./controllers/details");
const address = require("./controllers/address");

module.exports = {
  "/": {
    reset: true,
    entryPoint: true,
    skip: true,
    next: "details",
  },
  "/details": {
    fields: ["surname", "givenNames", "dateOfBirth"],
    controller: details,
    next: "address",
  },
  "/address": {
    fields: ["houseNameNumber", "streetName", "townCity", "postCode"],
    controller: address,
    next: (req) => {
      return req.session.returnPath;
    },
  },
};
