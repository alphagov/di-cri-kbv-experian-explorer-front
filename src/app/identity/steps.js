const done = require("./controllers/done");
const details = require("./controllers/details");
const address = require("./controllers/address");
const breakpoint = require("./controllers/breakpoint");
const identityVerification = require("./controllers/identityVerification");
const personSelector = require("./controllers/personSelector");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "select",
  },
  "/select": {
    fields: ["formType"],
    next: [
      { field: "formType", value: "input", next: "details"},
      { field: "formType", value: "dropDown", next: "personSelector"}
    ]
  },
  "/personSelector" : {
    controller: personSelector,
    fields: ["preconfiguredPerson"],
    next: "identity-verification"
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
