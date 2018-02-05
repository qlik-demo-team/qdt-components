const Hypercube = async (qDocPromise, dimensions = [], measures = [], limit = 50, offset = 0) => {
  try {
    let qDimensions = [];
    let qMeasures = [];
    if (dimensions.length) {
      qDimensions = dimensions.map(value => ({
        qLibraryId: '',
        qNullSuppression: false,
        qDef: {
          qGrouping: 'N',
          qFieldDefs: [value],
          qFieldLabels: [''],
        },
      }));
    }
    if (measures.length) {
      qMeasures = measures.map(value => ({
        qDef: {
          qLabel: '',
          qGrouping: 'N',
          qDef: value,
        },
        qSortBy: {
          qSortByState: 0,
          qSortByFrequency: 0,
          qSortByNumeric: 0,
          qSortByAscii: 0,
          qSortByLoadOrder: 0,
          qSortByExpression: 0,
          qExpression: {
            qv: '',
          },
        },
      }));
    }
    const obj = {
      qInfo: {
        qId: '',
        qType: 'HyperCube',
      },
      qHyperCubeDef: {
        qDimensions,
        qMeasures,
        qInitialDataFetch: [
          {
            qTop: offset,
            qLeft: 0,
            qHeight: limit,
            qWidth: 20,
          },
        ],
      },
    };
    const qDoc = await qDocPromise;
    const list = await qDoc.createSessionObject(obj);
    const layout = await list.getLayout();
    return layout.qHyperCube.qDataPages[0].qMatrix;
  } catch (error) {
    return error;
  }
};

export default Hypercube;
