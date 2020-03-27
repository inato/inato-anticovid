import React from "react";

import { colors } from "../colors";

export const UndoIcon = ({
  className,
  color = colors.DefaultText
}: {
  className?: string;
  color?: colors;
}) => {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.00165V3.66744H3.6658"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.99862 8.99897C7.03244 9.00016 8.74316 7.47453 8.97385 5.45383C9.20454 3.43313 7.88169 1.56118 5.89993 1.10394C3.91817 0.646706 1.9089 1.74987 1.23096 3.66738"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
