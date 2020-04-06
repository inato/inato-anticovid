import React, {
  createContext,
  useState,
  useLayoutEffect,
  useContext
} from "react";

export const ModalContext = createContext<HTMLDivElement | null>(null);

export const ModalProvider = ({ children }: any) => {
  const [value] = useState(() => document.createElement("div"));
  useLayoutEffect(() => {
    document.body.appendChild(value);
    return () => {
      // eslint-disable-next-line no-unused-expressions
      value.parentNode?.removeChild(value);
    };
  }, [value]);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error(
      "We did not found modal context, you probably forgot to use modal provider"
    );
  }
  return modalContext;
};
