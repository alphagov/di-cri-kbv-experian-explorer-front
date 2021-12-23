const debug = require("debug")("app:dynamic:question:controller");
const BaseController = require("hmpo-form-wizard").Controller;
const dynamicTranslate = require("../../dynamic-translate");

class QuestionController extends BaseController {
  isDynamicQuestion(key) {
    return key.includes(".dynamic-");
  }

  configure(req, res, next) {
    debug(this.options);
    debug(req.form.options);
    debug(req.form.options.translate);
    debug(req.translate);

    const keyName = `dynamic-${req.question.questionID}`;

    req.form.options.fields = {
      [keyName]: {
        label: req.question.text,
        type: "radios",
        validate: ["required"],
        // fieldset: {
        //   legend: {
        //     text: `fields.${keyName}.legend`,
        //   },
        // },
        items: req.question.answerFormat.answerList.map(
          (answer) => `answer-${answer.replaceAll(/[^a-z0-9]*/gi, "")}`
        ),
      },
    };

    const overrideTranslations = dynamicTranslate.buildOverrideTranslations(
      req.question
    );

    req.form.options.translate = dynamicTranslate.translateWrapper(
      req.translate,
      overrideTranslations
    );

    super.configure(req, res, next);
  }
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      // console.log("Question Locals");
      // console.log(req.sessionModel.toJSON());
      // console.log(req.questions);
      // console.log(req.question);
      locals.question = req.question;
      callback(err, locals);
    });
  }

  // process(req, res, next) {
  //   super.process(req, res, (err) => {
  //     console.log(req.form.options);
  //     console.log(req.form.values);
  //     next(new Error("process error"));
  //   });
  // }
  //
  // validate(req, res, next) {
  //   super.validate(req, res, (err) => {
  //     console.log(req.sessionModel.toJSON());
  //     next(new Error("validate error"));
  //   });
  // }
}

module.exports = QuestionController;
