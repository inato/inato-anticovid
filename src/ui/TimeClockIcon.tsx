import React from "react";

export const TimeClockIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 7.5C5.933 7.5 7.5 5.933 7.5 4C7.5 2.067 5.933 0.5 4 0.5C2.067 0.5 0.5 2.067 0.5 4C0.5 5.933 2.067 7.5 4 7.5Z"
        stroke="#8094A8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4V2.75"
        stroke="#8094A8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L5.20333 5.20358"
        stroke="#8094A8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
