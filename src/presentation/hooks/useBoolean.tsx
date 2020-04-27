import { useState, useCallback, useMemo } from 'react';

export const useBoolean = (initialValue: boolean) => {
  const [isTrue, setState] = useState(() => initialValue);
  const setToTrue = useCallback(() => setState(() => true), []);
  const setToFalse = useCallback(() => setState(() => false), []);
  const toggle = useCallback(() => setState(prev => !prev), []);

  return useMemo(
    () => ({
      isTrue,
      isFalse: !isTrue,
      setToTrue,
      setToFalse,
      toggle,
    }),
    [isTrue, setToFalse, setToTrue, toggle],
  );
};
