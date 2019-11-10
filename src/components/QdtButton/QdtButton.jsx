/**
 * @name QdtButton
 * @param {string} type [clearSelections, exportData, exportImg, exportPdf] - The button action
 * @param {string} title - The text on the button
 * @description
 * exportData, exportImg, exportPdf documentation:
 * https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/QVisualization.htm
*/

import React from 'react';
import PropTypes from 'prop-types';
import { LuiButton } from '../QdtLui';
import '../../styles/index.scss';

const QdtButton = (props) => {
  const {
    type, qDocPromise, qAppPromise, qVizPromise, options, title, block,
  } = props;

  // Sept 2018 BUG. Adds the current www folder in the path
  const urlFix = (url) => {
    const tempUrl = url.split('/');
    const sbstrIndex = url.indexOf('tempcontent');
    const _url = `${tempUrl[0]}//${tempUrl[2]}/${url.substring(sbstrIndex, url.length)}`;
    return _url;
  };

  const action = async () => {
    const qDoc = (qDocPromise) ? await qDocPromise : null;
    const qApp = (qAppPromise) ? await qAppPromise : null;
    const qViz = (qVizPromise) ? await qVizPromise : null;
    switch (type) {
      default:
      case 'clearSelections':
        if (qApp) qApp.clearAll();
        if (qDoc) qDoc.clearAll();
        break;
      case 'exportData':
        if (qViz) {
          const myOptions = (options) || { format: 'CSV_T', state: 'P' };
          const url = await qViz.exportData(myOptions);
          const myUrl = urlFix(url);
          window.open(myUrl, '_blank');
        }
        break;
      case 'exportImg':
        if (qViz) {
          const myOptions = (options) || { width: 300, height: 400, format: 'JPG' };
          const url = await qViz.exportImg(myOptions);
          const myUrl = urlFix(url);
          window.open(myUrl, '_blank');
        }
        break;
      case 'exportPdf':
        if (qViz) {
          const myOptions = (options) || { documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 };
          const url = await qViz.exportPdf(myOptions);
          const myUrl = urlFix(url);
          window.open(myUrl, '_blank');
        }
        break;
    }
  };

  return (
    <div>
      <LuiButton onClick={action} block={block}>
        {title}
      </LuiButton>
    </div>
  );
};

QdtButton.propTypes = {
  qDocPromise: PropTypes.object.isRequired,
  qAppPromise: PropTypes.object.isRequired,
  qVizPromise: PropTypes.object,
  type: PropTypes.oneOf(['clearSelections', 'exportData', 'exportImg', 'exportPdf']).isRequired,
  title: PropTypes.string.isRequired,
  block: PropTypes.string,
  options: PropTypes.object,
};

QdtButton.defaultProps = {
  block: false,
  qVizPromise: null,
  options: {},
};

export default QdtButton;
