import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

const settings = {
  qHyperCube: {
    path: '/qHyperCubeDef',
    dataFunc: 'getHyperCubeData',
    selectFunc: 'selectHyperCubeValues',
    selectArgs: {
      path: '/qHyperCubeDef', dimIndex: 0, values: [], toggle: true,
    },
  },
  qListObject: {
    path: '/qListObjectDef',
    dataFunc: 'getListObjectData',
    selectFunc: 'selectListObjectValues',
    selectArgs: { path: '/qListObjectDef', values: [], toggle: true },
  },
};

export default function QdtObject(Component, type) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      cols: PropTypes.array,
      options: PropTypes.object,
      qPage: PropTypes.object,
    };

    static defaultProps = {
      cols: [],
      options: {},
      qPage: {
        qTop: 0,
        qLeft: 0,
        qWidth: 10,
        qHeight: 100,
      },
    }

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        updating: false,
        error: null,
        qLayout: {},
        qData: {},
      };
    }

    componentWillMount() {
      this.qObjectPromise = this.create();
    }

    componentDidMount() {
      this.show();
    }

    settings = settings[type];

    async getLayout() {
      const qObject = await this.qObjectPromise;
      const qLayout = await qObject.getLayout();
      return qLayout;
    }

    async getData(qTop) {
      const qObject = await this.qObjectPromise;
      const qDataPages = await qObject[this.settings.dataFunc](this.settings.path, [{ ...this.props.qPage, qTop }]); // eslint-disable-line max-len
      return qDataPages[0];
    }

    async create() {
      try {
        const { qDocPromise } = this.props;
        const qProp = this.qProp();
        const qDoc = await qDocPromise;
        const qObjectPromise = qDoc.createSessionObject(qProp);
        return qObjectPromise;
      } catch (error) {
        this.setState({ error });
        return undefined;
      }
    }

    qProp() {
      const { cols, options } = this.props;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (options.qHyperCubeDef) {
        qProp.qHyperCubeDef = options.qHyperCubeDef;
      } else if (options.qListObjectDef) {
        qProp.qListObjectDef = options.qListObjectDef;
      } else {
        const qDimensions = cols.filter(col => !col.startsWith('=')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qFieldDefs: [col] } };
          } return col;
        });
        const qMeasures = cols.filter(col => col.startsWith('=')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qDef: col } };
          } return col;
        });
        if (qDimensions.length > 1 || qMeasures) {
          qProp.qHyperCubeDef = {
            qDimensions,
            qMeasures,
          };
        } else if (!qDimensions.length === 1 && !qMeasures) {
          const field = qDimensions[0];
          qProp.qListObjectDef = {
            field,
            qShowAlternatives: true,
            qAutoSortByState: { qDisplayNumberOfRows: 1 },
          };
        }
      }
      return qProp;
    }

    async show() {
      try {
        const qObject = await this.qObjectPromise;
        qObject.on('changed', () => { this.update(); });
        await this.update(this.props.qPage.qTop);
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ error });
      }
    }

    @autobind
    offset(qTop) {
      this.update(qTop);
    }

    async update(qTop = this.state.qData.qArea.qTop) {
      this.setState({ updating: true });
      const [qLayout, qData] = await Promise.all([this.getLayout(), this.getData(qTop)]);
      this.setState({ updating: false, qLayout, qData });
    }

    @autobind
    async beginSelections() {
      const qObject = await this.qObjectPromise;
      qObject.beginSelections([this.settings.path]);
    }

    @autobind
    async endSelections(qAccept) {
      const qObject = await this.qObjectPromise;
      qObject.endSelections(qAccept);
    }

    @autobind
    async select(qElemNumber, dimIndex = 0) {
      const args = Object.values({ ...this.settings.selectArgs, dimIndex, values: [qElemNumber] });
      const qObject = await this.qObjectPromise;
      qObject[this.settings.selectFunc](...args);
    }

    @autobind
    async searchListObjectFor(string) {
      const qObject = await this.qObjectPromise;
      qObject.searchListObjectFor('/qListObjectDef', string);
    }

    @autobind
    async acceptListObjectSearch() {
      const qObject = await this.qObjectPromise;
      qObject.acceptListObjectSearch('/qListObjectDef', true);
    }

    @autobind
    async applyPatches(patches) {
      const qObject = await this.qObjectPromise;
      qObject.applyPatches(patches);
    }

    render() {
      if (this.state.error) {
        return <div>{this.state.error.message}</div>;
      } else if (this.state.loading) {
        return <div>Loading...</div>;
      }
      return (<Component
        {...this.props}
        {...this.state}
        offset={this.offset}
        select={this.select}
        beginSelections={this.beginSelections}
        endSelections={this.endSelections}
        searchListObjectFor={this.searchListObjectFor}
        acceptListObjectSearch={this.acceptListObjectSearch}
        applyPatches={this.applyPatches}
      />);
    }
  };
}
