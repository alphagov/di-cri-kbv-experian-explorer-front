module.exports = {
  passportNumber: {
    type: "text",
    validate: ["numeric", { type: "exactlength", arguments: [9] }],
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
  flatNumber: {
    type: "text",
  },
  houseName: {
    type: "text",
  },
  houseNumber: {
    type: "text",
  },
  street: {
    type: "text",
  },
  locality: {
    type: "text",
  },
  postTown: {
    type: "text",
  },
  county: {
    type: "text",
  },
  postCode: {
    type: "text",
  },
};
