module.exports = {
  surname: {
    type: "text",
    validate: [],
    journeyKey: "surname",
  },
  givenNames: {
    type: "text",
    validate: [],
    journeyKey: "givenNames",
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
    ],
  },
  houseNameNumber: {
    journeyKey: "houseNameNumber",
    type: "text",
  },
  streetName: {
    journeyKey: "streetName",
    type: "text",
  },
  townCity: {
    journeyKey: "townCity",
    type: "text",
  },
  postCode: {
    journeyKey: "postCode",
    type: "text",
  },
};
