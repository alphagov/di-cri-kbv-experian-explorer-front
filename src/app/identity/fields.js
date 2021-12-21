module.exports = {
  passportNumber: {
    type: "text",
    validate: ["numeric", { type: "exactlength", arguments: [9] }],
  },
  api: {
    type: 'select',
    validate: 'required',
    items: [
      'fraud',
      'kbv',
    ]
  },
  title: {
    type: "text",
    validate: [],
    journeyKey: "title",
  },
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
    type: "text",
  },
  streetName: {
    type: "text",
  },
  townCity: {
    type: "text",
  },
  postCode: {
    type: "text",
  },
};
