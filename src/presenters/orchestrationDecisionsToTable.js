function orchestrationDecisionsToTable({ orchestrationDecisions } = {}) {
  const props = Object.keys(orchestrationDecisions[0]);

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
