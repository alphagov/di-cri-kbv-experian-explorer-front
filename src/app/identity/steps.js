const done = require("./controllers/done");
const details = require("./controllers/details");
const address = require("./controllers/address");
const breakpoint = require("./controllers/breakpoint");
const api = require("./controllers/api");
const identityVerification = require("./controllers/identityVerification");
const identityKBV = require("./controllers/identityKBV");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "details",
  },
  "/details": {
    fields: ["title", "surname", "givenNames", "dateOfBirth"],
    controller: details,
    next: "address",
  },
  "/address": {
    fields: ["houseNameNumber", "streetName", "townCity", "postCode"],
    controller: address,
    next: "api",
  },
  "/api": {
    fields: ["api"],
    controller: api,
    next: [
      { field: 'api', value: 'fraud', next: 'identity-verification' },
      { field: 'api', value: 'kbv', next: 'identity-kbv' },
    ]
  },
  "/identity-verification": {
    skip: true,
    controller: identityVerification,
    next: "breakpoint",
  },
  "/identity-kbv": {
    skip: true,
    controller: identityKBV,
    next: "breakpoint",
  },
  "/breakpoint": {
    controller: breakpoint,
    entrypoint: true,
    next: "done",
  },
  "/done": {
    controller: done,
    skip: false,
  },
};
