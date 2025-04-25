import { IconProps } from "./@types";

export const ArrowRight = ({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.0004 4.77491L20.5264 11.9999L13.0004 19.2249L12.2452 18.5249L18.5212 12.4999L5.47434 12.4999L5.47434 11.4999L18.5212 11.4999L12.2452 5.47491L13.0004 4.77491Z"
        fill={color}
      />
    </svg>
  );
};
