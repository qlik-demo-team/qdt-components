import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const QdtCurrentSelections = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const node = useRef(null);

  const { qAppPromise, width, height } = props;

  useEffect(() => {
    try {
      (async () => {
        const qApp = await qAppPromise;
        setLoading(false);
        qApp.getObject(node.current, 'CurrentSelections');
      })();
    } catch (_error) {
      setError(_error);
    }
  }, [loading, qAppPromise]);

  return (
    <>
      { error && error.message }
      { loading && 'Loading...' }
      <div style={{ width, height }} ref={node} />
    </>
  );
};

QdtCurrentSelections.propTypes = {
  qAppPromise: PropTypes.object.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

QdtCurrentSelections.defaultProps = {
  width: '100%',
  height: '100%',
};

export default QdtCurrentSelections;
