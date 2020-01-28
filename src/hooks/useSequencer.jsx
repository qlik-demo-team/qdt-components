import { useState, useEffect } from 'react';

const useSequencer = ({
  qData, delay, select, selectRow, toggleSelections, clearSelections,
}) => {
  const [init, setInit] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  const startSequencer = () => setPlay(true);

  const stopSequencer = () => setPlay(false);

  const moveNextSequencer = () => {
    if (currentRowIndex < qData.qMatrix.length - 1) {
      if (!play && selectRow && qData && qData.qMatrix[currentRowIndex]) select(qData.qMatrix[currentRowIndex + 1][0].qElemNumber, toggleSelections, true);
      if (qData && qData.qMatrix && currentRowIndex < qData.qMatrix.length) setCurrentRowIndex(currentRowIndex + 1);
    }
  };

  const movePreviousSequencer = () => {
    if (currentRowIndex > 0) {
      if (!play && selectRow && qData && qData.qMatrix[currentRowIndex]) select(qData.qMatrix[currentRowIndex - 1][0].qElemNumber, toggleSelections, true);
      if (qData && qData.qMatrix && currentRowIndex > 0) setCurrentRowIndex(currentRowIndex - 1);
    }
  };

  const reloadSequencer = () => {
    setCurrentRowIndex(0);
    if (selectRow) clearSelections();
  };

  useEffect(() => {
    if (!init && qData) setInit(true);
    if (init && play) setTimeout(() => setCurrentRowIndex(currentRowIndex + 1), delay * 1000);
    if (init && play && selectRow && qData && qData.qMatrix[currentRowIndex]) select(qData.qMatrix[currentRowIndex][0].qElemNumber, toggleSelections, true);
    if (init && play && currentRowIndex === qData.qMatrix.length - 1) setPlay(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, play, currentRowIndex]);

  return {
    currentRowIndex, play, startSequencer, stopSequencer, reloadSequencer, moveNextSequencer, movePreviousSequencer,
  };
};

export default useSequencer;
