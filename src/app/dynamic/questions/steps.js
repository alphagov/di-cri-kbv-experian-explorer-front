const question = require("./controllers/question");
const breakpoint = require("./controllers/breakpoint");
module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    next: "question",
  },
  "/question": {
    controller: question,
    next: "breakpoint",
  },
  "/breakpoint": {
    controller: breakpoint,
    entrypoint: true,
    next: "done",
  },
  "/done": {},
};
