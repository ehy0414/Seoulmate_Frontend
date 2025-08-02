import * as React from "react";

export const MenuIcon: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="menu-icon"
      style={{
        display: "flex",
        width: "16px",
        height: "16px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
        aspectRatio: "1/1"
      }}
    >
      <circle cx="8" cy="2" r="1.5" fill="#4E4646" />
      <circle cx="8" cy="8" r="1.5" fill="#4E4646" />
      <circle cx="8" cy="14" r="1.5" fill="#4E4646" />
    </svg>
  );
};
