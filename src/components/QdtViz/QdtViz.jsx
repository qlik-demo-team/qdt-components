/**
 * @name QdtViz
 * @param {object} app - Qlik Capability Api App
 * @param {options} object - Options
 * https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
*/

import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import merge from 'utils/merge';
import Button from '@material-ui/core/Button';

const QdtViz = ({ app, options: optionsProp, properties: propertiesProp }) => {
  const defaultOptions = {
    multiple: false,
    noSelections: false,
    noInteraction: false,
    type: 'barchart',
    cols: [],
    options: {},
    height: 400,
  };
  const defaultProps = {
    exportData: false,
    exportDataOptions: { format: 'CSV_T', state: 'P' },
    exportImg: false,
    exportImgOptions: { width: 600, height: 400, format: 'JPG' },
    exportPdf: false,
    exportPdfOptions: { documentSize: { width: 300, height: 150 } },
  };
  const options = merge(defaultOptions, optionsProp);
  const properties = merge(defaultProps, propertiesProp);

  const elementRef = useRef(null);
  const [qViz, setQViz] = useState(null);

  const create = async () => {
    let qVizPromise;
    if (options.id && options.id === 'CurrentSelections') {
      qVizPromise = app.getObject(elementRef.current, 'CurrentSelections');
      options.height = 50;
    } else if (options.id) {
      qVizPromise = app.visualization.get(options.id);
    } else {
      qVizPromise = app.visualization.create(options.type, options.cols, options.options);
    }
    const _qViz = await qVizPromise;
    if (options.id && options.id !== 'CurrentSelections') _qViz.setOptions(options);
    await setQViz(_qViz);
  };

  const show = useCallback(() => {
    if (qViz && qViz.show) qViz.show(elementRef.current, { noSelections: options.noSelections, noInteraction: options.noInteraction });
  });

  const close = useCallback(() => {
    qViz.close();
  });

  const resize = useCallback(() => {
    qViz.resize();
  });

  const urlFix = (url) => {
    const tempUrl = url.split('https://');
    return `https://${tempUrl[2]}`;
  };

  // https://help.qlik.com/en-US/sense-developer/September2020/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/exportData-method.htm
  const handleExportData = useCallback(async () => {
    const url = await qViz.exportData(properties.exportDataOptions);
    const _url = urlFix(url);
    window.open(_url, '_blank');
  }, [properties.exportDataOptions, qViz]);

  const handleExportImg = useCallback(async () => {
    const url = await qViz.exportImg(properties.exportImgOptions);
    window.open(url, '_blank');
  }, [properties.exportImgOptions, qViz]);

  const handleExportPdf = useCallback(async () => {
    const url = await qViz.exportPdf(properties.exportPdfOptions);
    window.open(url, '_blank');
  }, [properties.exportPdfOptions, qViz]);

  useEffect(() => {
    if (qViz) {
      show();
      window.addEventListener('resize', resize);
      return () => {
        close();
        window.removeEventListener('resize', resize);
      };
    }
    create();
  }, [qViz]); // eslint-disable-line

  // Unmount and destroy/close object
  useEffect(() => () => {
    if (qViz) close();
    window.removeEventListener('resize', resize);
  }, []); // eslint-disable-line

  return (
    <>
      <div ref={elementRef} style={{ height: options.height }} />
      {properties.exportData
        && (
        <Button variant="outline" color="default" onClick={handleExportData}>
          Export Data
        </Button>
        )}
      {properties.exportImg
        && (
        <Button variant="outline" color="default" onClick={handleExportImg}>
          Export image
        </Button>
        )}
      {properties.exportPdf
        && (
        <Button variant="outline" color="default" onClick={handleExportPdf}>
          Export Pdf
        </Button>
        )}
    </>
  );
};

QdtViz.propTypes = {
  app: PropTypes.object,
  options: PropTypes.object,
  properties: PropTypes.object,
};

QdtViz.defaultProps = {
  app: null,
  options: {},
  properties: {},
};


export default ({
  element, app, options, properties,
}) => {
  ReactDOM.unmountComponentAtNode(element);
  const destroy = () => {
    ReactDOM.unmountComponentAtNode(element);
  };
  ReactDOM.render(
    <QdtViz
      app={app}
      options={options}
      properties={properties}
    />,
    element,
  );
  return { destroy };
};

// export default QdtSelect;
