/**
 * @name QdtButton
 * @param {object} app - Qlik Sense app
 * @param {object} vis - Qlik Sense visualization
 * @param {string} type [clearSelections, exportData, exportImg, exportPdf] - The button action
 * @param {string} label - The text on the button
*/

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import '../../styles/index.scss';

// Sept 2018 BUG. Adds the current www folder in the path
// const urlFix = (url) => {
//   const tempUrl = url.split('/');
//   const sbstrIndex = url.indexOf('tempcontent');
//   const _url = `${tempUrl[0]}//${tempUrl[2]}/${url.substring(sbstrIndex, url.length)}`;
//   return _url;
// };

const QdtButton = ({
  app, options: optionsProp,
}) => {
  const defaultOptions = {};
  const options = { ...defaultOptions, ...optionsProp };

  const handleClick = useCallback(async () => {
    app.clearAll();
  }, [app]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {options.label}
      </Button>
    </>
  );
};

QdtButton.propTypes = {
  app: PropTypes.object.isRequired,
  options: PropTypes.object,
};

QdtButton.defaultProps = {
  options: {},
};

export default QdtButton;
