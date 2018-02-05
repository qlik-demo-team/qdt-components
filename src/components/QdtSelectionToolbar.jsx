import React from 'react';
import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';
import '../styles/index.scss';

const getObjectEngine = async (qDocPromise) => {
  const obj = {
    qInfo: {
      qId: '',
      qType: 'SelectionObject',
    },
    qSelectionObjectDef: {},
  };
  const qDoc = await qDocPromise;
  const list = await qDoc.createSessionObject(obj);
  const layout = await list.getLayout();
  console.log(layout);
  return layout.qSelectionObject.qSelections;
};

const getObjectApp = async (qAppPromise) => {
//   const obj = {
//     qInfo: {
//       qId: '',
//       qType: 'SelectionObject',
//     },
//     qSelectionObjectDef: {},
//   };
  const app = await qAppPromise;
  app.getList('SelectionObject', (layout) => {
    // callback(reply.qSelectionObject.qSelections);
    console.log(layout);
    return layout.qSelectionObject.qSelections;
  });
};

export default class QdtSelectionToolbar extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qAppPromise: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount() {
      try {
        const pe = getObjectEngine(this.props.qDocPromise);
        const pa = getObjectApp(this.props.qAppPromise);
        console.log(pe);
        console.log(pa);
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return (
        <div>
        Yiannis
        </div>
      );
    }
}
