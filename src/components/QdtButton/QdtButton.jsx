/**
 * @name QdtButton
 * @param {string} type [clearSelections, exportData, exportImg, exportPdf] - The button action
 * @param {string} title - The text on the button
 * @description
 * exportData, exportImg, exportPdf documentation:
 * https://help.qlik.com/en-US/sense-developer/November2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/QVisualization.htm
*/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LuiButton } from '../QdtLui';
import '../../styles/index.scss';

const QdtButton = (props) => {
  const {
    type, qDocPromise, qAppPromise, qViz, options, title, block,
  } = props;

  let qDoc = null;
  let qApp = null;

  // Sept 2018 BUG. Adds the current www folder in the path
  const urlFix = (url) => {
    const tempUrl = url.split('/');
    const sbstrIndex = url.indexOf('tempcontent');
    const _url = `${tempUrl[0]}//${tempUrl[2]}/${url.substring(sbstrIndex, url.length)}`;
    return _url;
  };

  const action = async () => {
    switch (type) {
      default:
      case 'clearSelections':
        if (qApp) qApp.clearAll();
        if (qDoc) qDoc.clearAll();
        break;
      case 'exportData':
        if (qViz) {
          const _options = (options) || { format: 'CSV_T', state: 'P' };
          const url = await qViz.exportData(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
      case 'exportImg':
        if (qViz) {
          const _options = (options) || { width: 300, height: 400, format: 'JPG' };
          const url = await qViz.exportImg(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
      case 'exportPdf':
        if (qViz) {
          const _options = (options) || { documentSize: 'a4', orientation: 'landscape', aspectRatio: 2 };
          const url = await qViz.exportPdf(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
    }
  };

  useEffect(() => {
    (async () => {
      if (qDocPromise) qDoc = await qDocPromise;
      if (qAppPromise) qApp = await qAppPromise;
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qDocPromise, qAppPromise, qViz]);

  return (
    <>
      <LuiButton onClick={action} block={block}>
        {title}
      </LuiButton>
    </>
  );
};

QdtButton.propTypes = {
  qDocPromise: PropTypes.object,
  qAppPromise: PropTypes.object,
  qViz: PropTypes.object,
  type: PropTypes.oneOf(['clearSelections', 'exportData', 'exportImg', 'exportPdf']).isRequired,
  title: PropTypes.string.isRequired,
  block: PropTypes.string,
  options: PropTypes.object,
};

QdtButton.defaultProps = {
  qDocPromise: null,
  qAppPromise: null,
  qViz: null,
  block: false,
  options: {},
};

export default QdtButton;
