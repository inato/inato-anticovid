import React from "react";

import { colors } from "../colors";

export const SpinnerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={colors.GreyBackground}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,5 C12.5522847,5 13,5.44771525 13,6 L13,11 C13,11.5522847 12.5522847,12 12,12 C11.4477153,12 11,11.5522847 11,11 L11,6 C11,5.44771525 11.4477153,5 12,5 Z" />
    </svg>
  );
};
