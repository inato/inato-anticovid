import React from "react";

export const CloseIcon = (props: {
  className?: string;
  onClick?: (event: React.MouseEvent<any>) => void;
}) => {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 16.5L16.5 1.5"
        stroke="#718FA5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 16.5L1.5 1.5"
        stroke="#718FA5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
