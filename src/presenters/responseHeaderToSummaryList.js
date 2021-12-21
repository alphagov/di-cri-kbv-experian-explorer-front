function responseHeaderToSummaryListRow({ responseHeader } = {}) {
  const baseProperties = Object.entries(responseHeader).filter(
    (item) => !["overallResponse"].includes(item[0])
  );

  let summaryListRows = baseProperties.map(mapItemToSummaryListRow);

  const overallResponse = Object.entries(responseHeader.overallResponse)
    .map((or) => {
      return [`overall response - ${or[0]}`, or[1]];
    })
    .map(mapItemToSummaryListRow);

  summaryListRows = summaryListRows.concat(overallResponse);

  return summaryListRows;
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

module.exports = responseHeaderToSummaryListRow;
