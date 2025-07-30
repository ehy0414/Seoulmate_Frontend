import React from 'react';

interface InfoIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({
  className = '',
  size = 26,
  color = '#1A1A1A'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path
        d="M13 2.6C18.7343 2.6 23.4 7.2657 23.4 13C23.4 18.7343 18.7343 23.4 13 23.4C7.2657 23.4 2.6 18.7343 2.6 13C2.6 7.2657 7.2657 2.6 13 2.6ZM13 0C5.8201 0 0 5.8201 0 13C0 20.1799 5.8201 26 13 26C20.1799 26 26 20.1799 26 13C26 5.8201 20.1799 0 13 0ZM14.3 16.9H11.7V19.5H14.3V16.9ZM11.7 14.3H14.3V6.5H11.7V14.3Z"
        fill={color}
      />
    </svg>
  );
};
