import React from 'react';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

const ArrowRightIcon: React.FC<IconProps> = ({
  color = '#fff',
  width = 45,
  height = 45,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="22.5"
        fill={color}
        fillOpacity="0.02"
      ></circle>
      <path
        fill={color}
        fillOpacity="0.4"
        d="M19.102 13.19l-.952.952a.6.6 0 000 .876l7.482 7.482-7.482 7.482a.602.602 0 00-.19.438c0 .165.063.311.19.438l.952.952a.601.601 0 00.876 0l8.872-8.872a.601.601 0 000-.875l-8.872-8.873a.602.602 0 00-.876 0z"
      ></path>
    </svg>
  );
};

export default ArrowRightIcon;
