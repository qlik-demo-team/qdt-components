import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import '../styles/index.scss';

// const getObjectApp = async (qAppPromise) => {
// //   const obj = {
// //     qInfo: {
// //       qId: '',
// //       qType: 'SelectionObject',
// //     },
// //     qSelectionObjectDef: {},
// //   };
//   const app = await qAppPromise;
//   app.getList('SelectionObject', (layout) => {
//     // callback(reply.qSelectionObject.qSelections);
//     console.log(layout);
//     return layout.qSelectionObject.qSelections;
//   });
// };

export default class QdtSelectionToolbar extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
    //   qAppPromise: PropTypes.object,
    }

    constructor(props) {
      super(props);

      this.state = {
        qDoc: null,
        selections: [],
      };
    }

    componentDidMount() {
      try {
        this.create();
      } catch (error) {
        console.log(error);
      }
    }

    @autobind
    async create() {
      const qDoc = await this.props.qDocPromise;
      this.setState({ qDoc });
      this.update();
      qDoc.on('changed', async () => { this.update(); });
    }

    @autobind
    async update() {
      const obj = {
        qInfo: {
          qId: '',
          qType: 'SelectionObject',
        },
        qSelectionObjectDef: {},
      };
      const list = await this.state.qDoc.createSessionObject(obj);
      const layout = await list.getLayout();
      const selectedFields = layout.qSelectionObject.qSelections;
      let selections = [];
      if (selectedFields.length) {
        selections = selectedFields.map((value) => {
          if (value.qSelectedCount === 1) {
            return {
              field: value.qField,
              selected: [value.qSelected],
            };
          } else if (value.qSelectedCount > 1 && value.qSelectedCount <= 6) {
            return {
              field: value.qField,
              selected: value.qSelectedFieldSelectionInfo,
              total: value.qTotal,
            };
          } else if (value.qSelectedCount > 6) {
            return {
              field: value.qField,
              selected: [`${value.qSelectedCount} of ${value.qTotal}`],
            };
          }
          return null;
        });
        this.setState({ selections });
      }
      return layout.qSelectionObject.qSelections;
    }

    render() {
      const { selections } = this.state;
      return (
        <div className="qdt-selection-toolbar">
          <ul>
            <li><strong>SELECTIONS:</strong></li>
            {selections.length === 0 &&
            <li className="no-selections">None</li>
            }
            {selections.length === 1 &&
                selections.map(value => <li key={value.field}>{value.field}<span className="lui-icon lui-icon--remove" /></li>)
            }
          </ul>
        </div>
      );
    }
}
