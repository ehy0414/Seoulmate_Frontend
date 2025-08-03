"use client";
import * as React from "react";

interface SendIconProps {
  className?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`send-icon ${className}`}
      style={{ width: "45px", height: "24px", flexShrink: 0 }}
    >
      <g clipPath="url(#clip0_635_2948)">
        <path
          d="M13.5713 22.5261C13.422 22.8638 13.17 23.0743 12.8152 23.1578C12.4604 23.2413 12.1538 23.1538 11.8952 22.8952L8.71608 19.7161L13.1467 12.4596L5.89018 16.8902L2.71105 13.7111C2.45201 13.452 2.36447 13.1453 2.44843 12.791C2.53239 12.4367 2.74298 12.1847 3.08018 12.0349L18.921 5.37825C19.3549 5.20342 19.7249 5.26907 20.0311 5.57521C20.3372 5.88135 20.4028 6.25135 20.228 6.68522L13.5713 22.5261Z"
          fill="#FBFBFB"
        />
      </g>
      <defs>
        <clipPath id="clip0_635_2948">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
