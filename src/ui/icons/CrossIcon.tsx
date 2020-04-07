import React from "react";

export const CrossIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 16.5L16 1.5"
        stroke="#BF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1.5L16 16.5"
        stroke="#BF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
