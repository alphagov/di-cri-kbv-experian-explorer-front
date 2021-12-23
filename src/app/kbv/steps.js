const setReturnPath = require("./controllers/set-return-path");
const displayDetails = require("./controllers/display-details");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    next: "set-return-path",
  },
  "/set-return-path": {
    skip: true,
    controller: setReturnPath,
    next: "/general/",
  },
  "/display-details": {
    controller: displayDetails,
    entryPoint: true,
    next: "get-questions",
  },
};
