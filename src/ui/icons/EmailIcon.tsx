import React from 'react';

export const EmailIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="17"
      viewBox="0 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 2.25C1.5 1.42157 2.17157 0.75 3 0.75H21C21.8284 0.75 22.5 1.42157 22.5 2.25V14.25C22.5 15.0784 21.8284 15.75 21 15.75H3C2.17157 15.75 1.5 15.0784 1.5 14.25V2.25Z"
        stroke="#BDC7D1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1611 1.30078L14.0171 7.56478C12.828 8.47953 11.1722 8.47953 9.98311 7.56478L1.83911 1.30078"
        stroke="#BDC7D1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
