const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log("root use!!");

  req.questions = [
    {
      questionID: "Q00059",
      text: "What are the last 4 digits from the long number across the middle of your credit card",
      toolTip:
        "The long number across the front. The long number across the middle of your card",
      answerFormat: {
        identifier: "A000008",
        fieldType: "R ",
        answerList: [
          "2226",
          "5790",
          "1126",
          "5495",
          "NONE OF THE ABOVE / DOES NOT APPLY",
        ],
      },
    },
    {
      questionID: "Q00039",
      text: "What is the balance, including interest, of your loan?",
      toolTip:
        "The approximate amount in £s on a current active personal loan. Does not include HP Loans, 2nd Mortgages or Home Credit",
      answerFormat: {
        identifier: "A000004",
        fieldType: "G ",
        answerList: [
          "UP TO £9,250",
          "OVER £9,250 UP TO £9,500",
          "OVER £9,500 UP TO £9,750",
          "OVER £9,750 UP TO £10,000",
          "NONE OF THE ABOVE / DOES NOT APPLY",
        ],
      },
    },
  ];

  next();
});

router.param("questionId", (req, res, next, questionId) => {
  console.log("params!!");
  console.log(questionId);
  req.question = req.questions.filter((question) => {
    // console.log(question);
    return question.questionID === questionId;
  })[0];

  next();
});
router.use("/questions/:questionId", require("./questions/router"));

module.exports = router;
