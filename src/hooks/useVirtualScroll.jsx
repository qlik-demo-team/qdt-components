import PropTypes from 'prop-types';

let start = 0;
let end = 0;
let translateY = 0;

const useVirtualScroll = ({
  viewportHeight, rowHeight, qData, offset,
}) => {
  // const [updating, setUpdating] = useState(false);

  end = viewportHeight / rowHeight;

  const handleScroll = (event) => {
    const { scrollTop } = event.target;
    const numOfViewportItems = viewportHeight / rowHeight;
    start = scrollTop / rowHeight;
    end = start + numOfViewportItems;
    translateY = rowHeight * start;

    if (qData.qArea.qTop > start) {
      const qTop = Math.max(0, (start - qData.qArea.qHeight) + numOfViewportItems);
      offset(qTop);
    } else if (qData.qArea.qTop + qData.qArea.qHeight < end) {
      const qTop = start;
      offset(qTop);
    }
    // setUpdating(false);
  };

  return { handleScroll, translateY };
};

useVirtualScroll.propTypes = {
  qData: PropTypes.object.isRequired,
  qcy: PropTypes.number.isRequired,
  offset: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  viewportHeight: PropTypes.number,
};

useVirtualScroll.defaultProps = {
  rowHeight: 40,
  viewportHeight: 200,
};

export default useVirtualScroll;
