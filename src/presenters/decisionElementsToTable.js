function orchestrationDecisionsToTable({ orchestrationDecisions } = {}) {
  const props = Object.keys(orchestrationDecisions[0]).filter((value) => {
    return !["rules", "otherData", "matches", "dataCounts", "scores"].includes(
      value
    );
  });

  const head = props.map((prop) => {
    return { text: prop };
  });

  const rows = orchestrationDecisions.map((row) => {
    return props.map((prop) => {
      return {
        text: row[prop],
      };
    });
  });

  return {
    head,
    rows,
  };
}

module.exports = orchestrationDecisionsToTable;
