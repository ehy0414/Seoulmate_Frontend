import * as React from "react";

interface AppTitleProps {
  title?: string;
}

export const AppTitle: React.FC<AppTitleProps> = ({ title = "서울메이트" }) => {
  return (
    <h1 className="mt-40 text-4xl font-medium text-red-500">
      {title}
    </h1>
  );
};
