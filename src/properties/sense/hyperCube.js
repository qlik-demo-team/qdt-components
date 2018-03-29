const hypercube = {
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: '',
        qSortCriterias: [{
          qSortByAscii: 1,
        }],
      },
    }],
    qMeasures: [{
      qDef: {
        qDef: '',
        qLabel: '',
      },
      qSortBy: {
        qSortByNumeric: -1,
      },
    }, {
      qDef: {
        qDef: '',
        qLabel: '',
      },
      qSortBy: {
        qSortByNumeric: -1,
      },
    }],
    qSuppressZero: false,
    qSuppressMissing: true,
    qInterColumnSortOrder: [],
    qInitialDataFetch: [{
      qLeft: 0, qTop: 0, qWidth: 10, qHeight: 500,
    }],
  },
};

export default hypercube;
