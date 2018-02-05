import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import '../styles/index.scss';

export default class QdtButton extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qAppPromise: PropTypes.object.isRequired,
      type: PropTypes.oneOf(['clearSelections']).isRequired,
      title: PropTypes.string.isRequired,
    }

    constructor(props) {
      super(props);

      this.state = {
        title: null,
      };
    }

    async componentWillMount() {
      this.setState({ title: this.props.title });
    }

    @autobind
    async action() {
      const qDoc = (this.props.qDocPromise) ? await this.props.qDocPromise : null;
      const qApp = (this.props.qAppPromise) ? await this.props.qAppPromise : null;
      switch (this.props.type) {
        default:
        case 'clearSelections':
          if (qApp) qApp.clearAll();
          if (qDoc) qDoc.clearAll();
          break;
      }
    }

    render() {
      const { action } = this;
      const { title } = this.state;
      return (
        <div
          className="qtd-button"
          onClick={action}
          role="button"
          tabIndex={0}
        >{title}
        </div>
      );
    }
}
