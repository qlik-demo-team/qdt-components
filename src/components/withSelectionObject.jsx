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
        qDoc: null,
        qObject: null,
        qLayout: null,
        updating: false,
        error: null,
      };
    }

    async componentWillMount() {
      try {
        const { qDocPromise } = this.props;
        const qProp = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };
        const qDoc = await qDocPromise;
        this.setState({ qDoc });
        const qObject = await qDoc.createSessionObject(qProp);
        qDoc.on('changed', () => { this.update(); });
        this.setState({ qObject }, () => {
          this.update();
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }

    async componentWillUnmount() {
      const { qDocPromise } = this.props;
      const qDoc = await qDocPromise;
      const { qObject: { id } } = this.state;
      qDoc.destroySessionObject(id);
    }

    async getLayout() {
      const { qObject } = this.state;
      const qLayout = await qObject.getLayout();
      return qLayout;
    }

    @autobind
    async update() {
      this.setState({ updating: true });
      const qLayout = await this.getLayout();
      this.setState({ updating: false, qLayout });
    }

    @autobind
    async clearSelections(field, value) {
      this.setState({ updating: true });
      const { qDoc } = this.state;
      if (field) {
        const qField = await qDoc.getField(field);
        if (value) {
          await qField.toggleSelect(value);
        } else {
          await qField.clear();
        }
      } else {
        qDoc.clearAll();
      }
      this.setState({ updating: false });
    }

    render() {
      const {
        qObject, qLayout, error,
      } = this.state;
      if (error) {
        return <div>{error.message}</div>;
      } if (!qObject || !qLayout) {
        return <div>Loading...</div>;
      }
      return (
        <Component
          {...this.props}
          {...this.state}
          clearSelections={this.clearSelections}
        />
      );
    }
  };
}
