import { useState, useEffect } from 'react';

const useSequencer = ({
  qData, delay, select, selectRow, toggleSelections, keyCode, clearSelections,
}) => {
  const [init, setInit] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  const startSequencer = () => setPlay(true);

  const stopSequencer = () => setPlay(false);

  const reloadSequencer = () => {
    setCurrentRowIndex(0);
    if (selectRow) clearSelections();
  };

  const checkKey = (event) => {
    if (event.keyCode === keyCode) setPlay(!play);
  };

  useEffect(() => {
    if (!init && qData) setInit(true);
    if (init && play) setTimeout(() => setCurrentRowIndex(currentRowIndex + 1), delay * 1000);
    if (init && play && selectRow && qData && qData.qMatrix[currentRowIndex]) select(qData.qMatrix[currentRowIndex][0].qElemNumber, toggleSelections, true);
    if (init && play && currentRowIndex === qData.qMatrix.length) setPlay(false);
    if (keyCode) window.addEventListener('keydown', checkKey, true);
    return () => {
      if (keyCode) window.removeEventListener('keydown', checkKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, play, currentRowIndex]);

  return {
    currentRowIndex, play, startSequencer, stopSequencer, reloadSequencer,
  };
};

export default useSequencer;
