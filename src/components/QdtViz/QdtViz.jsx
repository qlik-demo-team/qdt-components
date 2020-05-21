/**
 * @name QdtViz
 * @param {object} app - Qlik Capability Api App
 * @param {options} object - Options
 * https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
*/

import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import merge from 'utils/merge';

const QdtViz = ({ app, options: optionsProp }) => {
  const defaultOptions = {
    multiple: false,
    noSelections: false,
    noInteraction: false,
    type: 'barchart',
    cols: [],
    options: {},
    height: 400,
  };
  const options = merge(defaultOptions, optionsProp);

  const elementRef = useRef(null);
  const [qViz, setQViz] = useState(null);

  const create = async () => {
    const qVizPromise = (options.id) ? app.visualization.get(options.id) : app.visualization.create(options.type, options.cols, options.options); // eslint-disable-line max-len
    const _qViz = await qVizPromise;
    _qViz.setOptions(options);
    await setQViz(_qViz);
  };

  const show = () => {
    qViz.show(elementRef.current, { noSelections: options.noSelections, noInteraction: options.noInteraction });
  };

  const close = () => {
    qViz.close();
  };

  const resize = () => {
    qViz.resize();
  };

  useEffect(() => {
    (async () => {
      if (!qViz) await create();
      if (qViz) show();
      window.addEventListener('resize', resize);
    })();
    return () => {
      if (qViz) close();
      window.removeEventListener('resize', resize);
    };
  }, [close, create, qViz, resize, show]);

  return (
    <div ref={elementRef} style={{ height: options.height }} />
  );
};

QdtViz.propTypes = {
  app: PropTypes.object,
  options: PropTypes.object,
};

QdtViz.defaultProps = {
  app: null,
  options: {},
};


export default ({ element, app, options }) => {
  ReactDOM.unmountComponentAtNode(element);
  ReactDOM.render(
    <QdtViz
      app={app}
      options={options}
    />,
    element,
  );
};

// export default QdtSelect;
