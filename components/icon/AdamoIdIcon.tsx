import { ComponentProps } from "react";

export type AdamoIDIconProps = ComponentProps<"svg">;

export function AdamoIDIcon({ ...props }: AdamoIDIconProps) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.7638 27.46C27.3738 32.8499 18.6324 32.8499 13.2402 27.46"
        stroke="white"
        strokeWidth="4.33277"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.0001 43C34.0459 43 43.0003 34.0457 43.0003 23C43.0003 11.9543 34.0459 3 23.0001 3C11.9544 3 3 11.9543 3 23C3 34.0457 11.9544 43 23.0001 43Z"
        stroke="white"
        strokeWidth="4.33277"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
