import React, { useEffect } from 'react';

export const useOnOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [callback, ref]);
};
