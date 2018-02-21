import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default function withListObject(Component) {
  return class extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        updating: false,
        error: null,
        qObject: {},
        qLayout: {},
      };
    }

    async componentWillMount() {
      try {
        const { qDocPromise } = this.props;
        const qProp = this.generateQProp();
        const qDoc = await qDocPromise;
        const qObject = await qDoc.createSessionObject(qProp);
        qObject.on('changed', () => { this.update(); });
        this.setState({ qObject }, () => {
          const { qPage } = this.props.qPage;
          this.update(qPage.qTop);
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }

    generateQProp() {
      const { cols, options } = this.props;
      const qProp = { qInfo: { qType: 'visualization' } };
      if (options.qHyperCubeDef) {
        qProp.qHyperCubeDef = options.qHyperCubeDef;
      } else if (options.qListObjectDef) {
        qProp.qListObjectDef = options.qListObjectDef;
      } else {
        const qDimensions = cols.filter(col => col && !col.startsWith('=')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qFieldDefs: [col] } };
          } return col;
        });
        const qMeasures = cols.filter(col => col && col.startsWith('=')).map((col) => {
          if (typeof col === 'string') {
            return { qDef: { qDef: col } };
          } return col;
        });
        if (qDimensions.length > 1 || qMeasures.length) {
          qProp.qHyperCubeDef = {
            qDimensions,
            qMeasures,
          };
        } else if (qDimensions.length === 1 && !qMeasures.length) {
          const qDef = qDimensions[0];
          qProp.qListObjectDef = {
            ...qDef,
            qShowAlternatives: true,
            qAutoSortByState: { qDisplayNumberOfRows: 1 },
          };
        }
      }
      return qProp;
    }

    async getLayout() {
      const { qObject } = this.state;
      const qLayout = await qObject.getLayout();
      return qLayout;
    } 

    async update() {
      this.setState({ updating: true });
      const qLayout = await this.getLayout();
      this.setState({ updating: false, qLayout });
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
      />);
    }
  };
}
