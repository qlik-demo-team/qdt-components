import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const Preloader = (props) => {
  const { width, height, paddingTop } = props;
  return (
    <div className="qtd-preloader" style={{ width, height, 'padding-top': paddingTop }}>
      <div className="qtd-preloader-ball1" />
      <div className="qtd-preloader-ball2" />
    </div>
  );
};
Preloader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  paddingTop: PropTypes.string,
};
Preloader.defaultProps = {
  width: '100%',
  height: '100%',
  paddingTop: 0,
};
export default Preloader;
