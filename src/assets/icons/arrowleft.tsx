import React from 'react';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

const ArrowLeftIcon: React.FC<IconProps> = ({
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
        r="22.5"
        fill={color}
        fillOpacity="0.02"
        transform="matrix(-1 0 0 1 22.5 22.5)"
      ></circle>
      <path
        fill={color}
        fillOpacity="0.4"
        d="M25.898 13.19l.952.952a.6.6 0 010 .876L19.368 22.5l7.482 7.482a.601.601 0 010 .876l-.952.952a.601.601 0 01-.876 0l-8.872-8.872a.601.601 0 010-.875l8.872-8.873a.602.602 0 01.876 0z"
      ></path>
    </svg>
  );
};

export default ArrowLeftIcon;
