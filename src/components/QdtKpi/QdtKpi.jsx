/**
 * @name QdtKpi
 * @param {object} layout - Qlik object layout
 * @param {string} format - Optional format string, based on https://docs.python.org/3/library/string.html#format-specification-mini-language
*/

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import '../../styles/index.scss';

const QdtKpi = ({ layout, format: specifier }) => {
  const value = useMemo(() => format(specifier)(layout.qMatrix[0][0].qText), [layout, specifier]);
  return (
    <>
      <div className='qdt-kpi'>
        {value}
      </div>
    </>
  );
};

QdtKpi.propTypes = {
  layout: PropTypes.object,
  format: PropTypes.string,
};
QdtKpi.defaultProps = {
  layout: null,
  format: '',
};

export default QdtKpi;
