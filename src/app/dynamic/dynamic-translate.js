const debug = require("debug")("app:dynamic:dynamic-translate");
const _ = require("lodash");

function arrayify(value) {
  return [].concat(value || []);
}

module.exports = {
  buildOverrideTranslations(question) {
    const keyName = `dynamic-${question.questionID}`;

    const overrideTranslations = {
      fields: {
        [keyName]: {
          content: `content: ${question.text}`,
          legend: `legend - ${question.text}`,
          label: `label - ${question.text}`,
          hint: `hint - ${question.toolTip}`,
          validation: {
            default: "You need to say what the balancce of your loan is",
          },
          items: question.answerFormat.answerList.reduce((acc, answer) => {
            const answerKey = `answer-${answer.replaceAll(/[^a-z0-9]*/gi, "")}`;

            acc[answerKey] = {
              label: answer,
            };

            return acc;
          }, {}),
        },
      },
    };

    // console.log(JSON.stringify(overrideTranslations, null, 2));

    return overrideTranslations;
  },

  translateWrapper(originalTranslate, overrideTranslations) {
    return function (key, options) {
      if (typeof key === "string" && !key.includes(".dynamic-")) {
        return originalTranslate(key, options);
      }

      if (
        Array.isArray(key) &&
        !key.some((entry) => entry.includes(".dynamic-"))
      ) {
        return originalTranslate(key, options);
      }

      const keys = arrayify(key);
      debug("TRANSLATE!");
      debug(keys);
      debug(JSON.stringify(overrideTranslations, null, 2));
      const prop = keys.reduce((acc, value) => {
        return acc || _.get(overrideTranslations, value);
      }, "");

      debug(prop);
      return prop;

      debug("NOT FOUND");
      return originalTranslate(key, options);
    };
  },
};
