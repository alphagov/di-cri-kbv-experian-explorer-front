const done = require("./controllers/done");
const details = require("./controllers/details");
const address = require("./controllers/address");
const breakpoint = require("./controllers/breakpoint");
const identityVerification = require("./controllers/identityVerification");

module.exports = {
  "/": {
    resetJourney: true,
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
    next: "identity-verification",
  },
  "/identity-verification": {
    skip: true,
    controller: identityVerification,
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
