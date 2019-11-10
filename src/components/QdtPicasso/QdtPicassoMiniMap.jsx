import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import picasso from 'picasso.js';
import picassoHammer from 'picasso-plugin-hammer';
import picassoQ from 'picasso-plugin-q';
import preconfiguredSettings from './picasso/settings';
import '../../styles/index.scss';

picasso.use(picassoHammer);
picasso.use(picassoQ);

let pic = null;
const height = 50;

const QdtPicassoMiniMap = ({
  qLayout, qData, offset, qRData, type, offsetPicasso, outerWidth, innerWidth,
}) => {
  const [thumbSize, setThumbSize] = useState({
    left: 0,
    width: 0,
  });
  const rootNodeMini = useRef(null);
  const elementNodeMini = useRef(null);

  let settings = null;

  const calculate = () => {
    const { qHyperCube: { qSize: { qcy } } } = qLayout;
    const { qArea: { qHeight, qTop } } = qData;
    const totalWidth = elementNodeMini.current.getBoundingClientRect().width;
    const pages = Math.round(qcy / qHeight);
    const width = totalWidth / pages;
    const currentPage = qTop / qHeight;
    const left = width * currentPage;
    setThumbSize({ left, width });
  };

  // Capture all clicks outside of the component
  const handleOutsideClick = async (event) => {
    const { target, pageX } = event;
    const { qArea: { qTop, qHeight } } = qData;
    const { left, width } = thumbSize;
    const insideClick = rootNodeMini.current.contains(target);
    // Check if the click is inside the miniMap
    if (insideClick) {
      // Check if the click is to the left of the current page overlay
      if (pageX < left) {
        const position = qTop - qHeight;
        await offset(position);
        // calculate();
        offsetPicasso(position);
      // Check if the click is to the right of the current page overlay
      } else if (pageX > (left + width)) {
        const position = qTop + qHeight;
        await offset(position);
        // calculate();
        offsetPicasso(position);
      }
    }
  };

  const handleResize = () => pic.update();

  const createPic = async () => {
    const tempSettings = preconfiguredSettings[type];
    settings = {
      components: [],
      scales: tempSettings.scales,
    };
    const data = { ...qLayout, qHyperCube: { ...qLayout.qHyperCube, qDataPages: [qRData] } };
    if (type === 'horizontalBarchart' || type === 'verticalBarchart') {
      const { components: [,,, box] } = tempSettings;
      const { brush, ...noInteractionBox } = box;
      settings.components.push(noInteractionBox);
    }
    pic = picasso({ renderer: { prio: ['canvas'] } }).chart({
      element: elementNodeMini.current,
      data: [{
        type: 'q',
        key: 'qHyperCube',
        data: data.qHyperCube,
      }],
      settings,
    });
  };

  useEffect(() => {
    if (qData) {
      calculate();
      createPic();
    }
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qData]);

  return (
    <div ref={rootNodeMini} style={{ position: 'relative' }}>
      <div style={{
        position: 'relative', width: outerWidth, height: '50px', overflow: 'auto', paddingRight: 10,
      }}
      >
        <div
          id="mini"
          ref={elementNodeMini}
          style={{
            backgroundColor: '#EFEFEF',
            padding: 3,
            width: innerWidth,
            height,
            maxWidth: '100%',
            maxHeight: height,
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            border: '1px solid rgba(89, 89, 89, 0.4)',
            backgroundColor: 'rgba(0,0,0,0.1)',
            position: 'absolute',
            top: 0,
            left: thumbSize.left,
            width: thumbSize.width,
            padding: 0,
            height,
            maxHeight: height,
            cursor: 'default',
          }}
        />
      </div>
    </div>
  );
};

QdtPicassoMiniMap.propTypes = {
  qData: PropTypes.object.isRequired,
  qRData: PropTypes.object.isRequired,
  qLayout: PropTypes.object.isRequired,
  outerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  innerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string.isRequired,
  offset: PropTypes.func.isRequired,
  offsetPicasso: PropTypes.func.isRequired,
};

export default QdtPicassoMiniMap;
