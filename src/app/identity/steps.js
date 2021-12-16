const done = require("./controllers/done");
const details = require("./controllers/details");
const address = require("./controllers/address");
const breakpoint = require("./controllers/breakpoint");

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
    fields: [
      "flatNumber",
      "houseName",
      "houseNumber",
      "street",
      "locality",
      "postTown",
      "county",
      "postCode",
    ],
    controller: address,
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
