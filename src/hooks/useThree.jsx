// import {
//   useCallback, useRef, useReducer, useEffect,
// } from 'react';
import merge from 'deepmerge';

const useThree = ({ layout }) => {
  const defaultOptions = {
  };
  const options = merge(defaultOptions, optionsProp);
  console.log(layout, options);

  return {
    layout, options
  };
};

export default useThree;