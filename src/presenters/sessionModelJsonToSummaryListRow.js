function sessionModelJsonToSummaryListRow({ sessionModel } = {}) {
  return Object.entries(sessionModel).map(mapItemToSummaryListRow);
}

const mapItemToSummaryListRow = (item) => {
  return {
    key: {
      text: item[0],
    },
    value: {
      text: item[1],
    },
  };
};

module.exports = sessionModelJsonToSummaryListRow;
