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
      qDoc.on('changed', async () => { console.log('changed'); this.update(); });
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
      console.log(1);
      console.log(layout);
      const selectedFields = layout.qSelectionObject.qSelections;
      let selections = [];
      if (selectedFields.length) {
        console.log(2);
        selections = selectedFields.map((value) => {
          console.log(3);
          console.log(value);
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
        console.log(4);
        console.log(selections);
      }
      return layout.qSelectionObject.qSelections;
    }

    render() {
      const { selections } = this.state;
      console.log(9);
      if (selections.length) console.log(selections[0].field);
      return (
        <div className="qdt-selection-toolbar">
            Selection Toolbar
          <ul>
            <li><strong>SELECTIONS: </strong></li>
            {selections.length === 0 &&
            <li className="no-selections">None</li>
            }
            {selections.length === 1 &&
                selections.map(value => <li key={value.field}>{value.field}</li>)
            }
          </ul>
        </div>
      );
    }
}
