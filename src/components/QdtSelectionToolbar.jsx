import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../styles/index.scss';

export default class QdtSelectionToolbar extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
    //   qAppPromise: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        qDoc: null,
        selections: [],
        dropdownOpen: [false, false, false, false, false, false],
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
    toggle(index) {
      const { dropdownOpen } = this.state;
      dropdownOpen[index] = !(dropdownOpen[index]);
      this.setState({
        dropdownOpen,
      });
    }

    @autobind
    reset() {
      const dropdownOpen = [false, false, false, false, false, false];
      this.setState({
        dropdownOpen,
      });
    }

    @autobind
    async create() {
      const qDoc = await this.props.qDocPromise;
      this.setState({ qDoc });
      this.update();
      qDoc.on('changed', async () => { this.update(); });
    }

    @autobind
    async clear(field) {
      if (field) {
        const model = await this.state.qDoc.getField(field);
        model.clear();
      } else {
        this.state.qDoc.clearAll();
      }
    }

    @autobind
    async clearOne(field, value) {
      if (field && value) {
        const model = await this.state.qDoc.getField(field);
        model.toggleSelect(value, false, false);
      }
    }

    @autobind
    popup() { }

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
          if (value.qSelectedCount >= 1 && value.qSelectedCount <= 6) {
            return {
              field: value.qField,
              selected: value.qSelectedFieldSelectionInfo.map(valueInner => valueInner.qName),
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
      }
      this.setState({ selections });
      return layout.qSelectionObject.qSelections;
    }

    render() {
      const { selections } = this.state;
      const {
        clear, clearOne, reset, toggle,
      } = this;
      return (
        <div className="qdt-selection-toolbar">
          <ul>
            <li><strong>SELECTIONS:</strong></li>
            {selections.length === 0 &&
            <li className="no-selections">None</li>
            }
            {selections.length === 1 &&
                selections.map(value => (<li key={value.field}>{value.field}: {value.selected[0]}<span className="lui-icon lui-icon--remove" onClick={() => clear(value.field)} role="button" tabIndex={0} /></li>))
            }
            {selections.length > 1 && selections.length <= 6 &&
                selections.map((value, index) => {
                    if (value.selected.length === 1) {
                        return <li key={value.field}>{value.field}: {value.selected[0]}<span className="lui-icon lui-icon--remove" onClick={() => clear(value.field)} role="button" tabIndex={0} /></li>;
                    }
                        return (
                          <li>
                            <ButtonDropdown isOpen={this.state.dropdownOpen[index]} toggle={reset} onClick={() => toggle(index)} key={value.field}>
                              <DropdownToggle>
                                {value.field}: {value.selected.length} of {value.total}
                                <span className="lui-icon lui-icon--triangle-bottom" />

                              </DropdownToggle>
                              <DropdownMenu>
                                {value.selected.map(value2 => <DropdownItem key={value2}>{value2}<span className="lui-icon lui-icon--remove pull-right" onClick={() => clearOne(value.field, value2)} role="button" tabIndex={0} /></DropdownItem>)}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </li>
                        );
                })
            }
          </ul>
        </div>
      );
    }
}
