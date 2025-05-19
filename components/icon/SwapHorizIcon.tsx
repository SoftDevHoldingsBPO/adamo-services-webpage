import React from "react";

import { IconProps } from "./@types";

const SwapHorizIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_941_13343"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_941_13343)">
        <path
          d="M6.25647 15.6507L2.83334 12.2275L6.25647 8.80462L6.74209 9.274L4.12189 11.8942H10.4231V12.5609H4.12189L6.74209 15.1811L6.25647 15.6507ZM13.7436 11.1796L13.2579 10.71L15.8781 8.08983H9.57689V7.42317H15.8781L13.2579 4.80296L13.7436 4.33337L17.1667 7.7565L13.7436 11.1796Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default SwapHorizIcon;
