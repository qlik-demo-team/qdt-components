/**
 * @name QdtButton
 * @param {object} app - Qlik Sense app
 * @param {object} vis - Qlik Sense visualization
 * @param {string} type [clearSelections, exportData, exportImg, exportPdf] - The button action
 * @param {string} label - The text on the button
*/

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import '../../styles/index.scss';

// Sept 2018 BUG. Adds the current www folder in the path
const urlFix = (url) => {
  const tempUrl = url.split('/');
  const sbstrIndex = url.indexOf('tempcontent');
  const _url = `${tempUrl[0]}//${tempUrl[2]}/${url.substring(sbstrIndex, url.length)}`;
  return _url;
};

const QdtButton = ({ app, vis, type, label, options: optionsProp }) => {
  const defaultOptions = {};
  const options = { ...defaultOptions, ...optionsProp };

  const handleClick = useCallback(async () => {
    switch (type) {
      case 'exportData':
        if (vis) {
          const _options = (options) || { format: 'CSV_T', state: 'P' };
          const url = await vis.exportData(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
      case 'exportImg':
        if (vis) {
          const _options = (options) || { width: 300, height: 400, format: 'JPG' };
          const url = await vis.exportImg(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
      case 'exportPdf':
        if (vis) {
          const _options = (options) || { documentSize: 'a4', orientation: 'landscape', aspectRatio: 2 };
          const url = await vis.exportPdf(_options);
          const _url = urlFix(url);
          window.open(_url, '_blank');
        }
        break;
      case 'clearSelections':
      default:
        app.clearAll();
        break;
    }
  }, [app, vis, type]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {label}
      </Button>
    </>
  );
};

QdtButton.propTypes = {
  app: PropTypes.object,
  vis: PropTypes.object,
  type: PropTypes.oneOf(['clearSelections', 'exportData', 'exportImg', 'exportPdf']),
  label: PropTypes.string,
  options: PropTypes.object,
};

QdtButton.defaultProps = {
  app: null,
  vis: null,
  type: 'clearSelections',
  label: 'Clear',
  options: {},
};

export default QdtButton;
