import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { LuiButton } from 'qdt-lui';
import '../styles/index.scss';

export default class QdtButton extends React.Component {
    static propTypes = {
      qDocPromise: PropTypes.object.isRequired,
      qAppPromise: PropTypes.object.isRequired,
      type: PropTypes.oneOf(['clearSelections']).isRequired,
      title: PropTypes.string.isRequired,
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
      const { title } = this.props;
      return (
        <LuiButton onClick={this.action}>
          {title}
        </LuiButton>
      );
    }
}
