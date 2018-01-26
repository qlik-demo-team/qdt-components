import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

export default class QdtVirtualScroll extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qcy: PropTypes.number.isRequired,
    Component: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    offset: PropTypes.func.isRequired,
    rowHeight: PropTypes.number,
    viewportHeight: PropTypes.number,
  }

  static defaultProps = {
    componentProps: {},
    rowHeight: 40,
    viewportHeight: 200,
  }

  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      end: this.props.viewportHeight / this.props.rowHeight,
      translateY: 0,
    };
  }

  @autobind
  handleScroll(event) {
    const { scrollTop } = event.target;
    const {
      qData, viewportHeight, rowHeight,
    } = this.props;

    const numOfViewportItems = viewportHeight / rowHeight;
    const start = scrollTop / rowHeight;
    const end = start + numOfViewportItems;
    const translateY = rowHeight * start;

    if (qData.qArea.qTop > start) {
      const qTop = Math.max(0, (start - qData.qArea.qHeight) + numOfViewportItems);
      this.props.offset(qTop);
    } else if (qData.qArea.qTop + qData.qArea.qHeight < end) {
      const qTop = start;
      this.props.offset(qTop);
    }
    this.setState({ start, end, translateY });
  }

  render() {
    const { handleScroll } = this;
    const {
      qData, qcy, viewportHeight, rowHeight, Component, componentProps,
    } = this.props;
    const { start, end, translateY } = this.state;
    const qMatrix = qData.qMatrix.slice(start - qData.qArea.qTop, end - qData.qArea.qTop);
    return (
      <div
        style={{
          position: 'relative',
          height: `${viewportHeight}px`,
          overflowY: 'auto',
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            position: 'absolute',
          }}
        >
          <Component {...componentProps} qMatrix={qMatrix} rowHeight={rowHeight} />
        </div>
        <div style={{ height: `${rowHeight * qcy}px` }} />
      </div>
    );
  }
}
