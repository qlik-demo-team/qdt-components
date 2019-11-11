import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../../utilities/Preloader';
import QdtButton from '../QdtButton/QdtButton';


const QdtViz = ({
  qAppPromise, id, type, cols, options, noSelections, noInteraction, width, height, minWidth, minHeight, exportData, exportDataTitle, exportDataOptions, exportImg, exportImgTitle, exportImgOptions, exportPdf, exportPdfTitle, exportPdfOptions,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const node = useRef(null);

  let qViz = null;

  const btnStyle = { display: 'inline-block', paddingRight: 20, paddingTop: 15 };
  let qVizPromise = null;

  const create = async () => {
    const qApp = await qAppPromise;
    qVizPromise = id ? qApp.visualization.get(id) : qApp.visualization.create(type, cols, options); // eslint-disable-line max-len
    qViz = await qVizPromise;
    qViz.setOptions(options);
    await setLoading(false);
    qViz.show(node.current, { noSelections, noInteraction });
  };

  const close = () => {
    qViz.close();
  };

  const resize = () => {
    qViz.resize();
  };

  useEffect(() => {
    try {
      (async () => {
        await create();
        window.addEventListener('resize', resize);
      })();
    } catch (_error) {
      setError(_error);
    }
    return () => {
      close();
      window.removeEventListener('resize', resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { error && <div>{error.message}</div> }
      { loading && <Preloader width={width} height={height} paddingTop={(parseInt(height, 0)) ? (height / 2) - 10 : 0} /> }
      { !error && !loading
        && (
          <>
            <div
              ref={node}
              style={{
                width, height, minWidth, minHeight, position: 'absolute', top: 0, bottom: 0,
              }}
            />
            {exportData && (
            <div style={btnStyle}>
              <QdtButton type="exportData" qVizPromise={qVizPromise} title={exportDataTitle} options={exportDataOptions} />
            </div>
            )}
            {exportImg && (
            <div style={btnStyle}>
              <QdtButton type="exportImg" qVizPromise={qVizPromise} title={exportImgTitle} options={exportImgOptions} />
            </div>
            )}
            {exportPdf
          && (
            <div style={btnStyle}>
              <QdtButton type="exportPdf" qVizPromise={qVizPromise} title={exportPdfTitle} options={exportPdfOptions} />
            </div>
          )}
          </>
        )}
    </>
  );
};

QdtViz.propTypes = {
  qAppPromise: PropTypes.object.isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf([null, 'barchart', 'boxplot', 'combochart', 'distributionplot', 'gauge', 'histogram', 'kpi', 'linechart', 'piechart', 'pivot-table', 'scatterplot', 'table', 'treemap', 'extension']),
  cols: PropTypes.array,
  options: PropTypes.object,
  noSelections: PropTypes.bool,
  noInteraction: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  exportData: PropTypes.bool,
  exportDataTitle: PropTypes.string,
  exportDataOptions: PropTypes.object,
  exportImg: PropTypes.bool,
  exportImgTitle: PropTypes.string,
  exportImgOptions: PropTypes.object,
  exportPdf: PropTypes.bool,
  exportPdfTitle: PropTypes.string,
  exportPdfOptions: PropTypes.object,
};

QdtViz.defaultProps = {
  id: null,
  type: null,
  cols: [],
  options: {},
  noSelections: false,
  noInteraction: false,
  width: '100%',
  height: '100%',
  minWidth: 'auto',
  minHeight: 'auto',
  exportData: false,
  exportDataTitle: 'Export Data',
  exportDataOptions: { format: 'CSV_T', state: 'P' },
  exportImg: false,
  exportImgTitle: 'Export Image',
  exportImgOptions: { width: 300, height: 400, format: 'JPG' },
  exportPdf: false,
  exportPdfTitle: 'Export Pdf',
  exportPdfOptions: { documentSize: 'A4', orientation: 'landscape', aspectRatio: 2 },
};

export default QdtViz;
