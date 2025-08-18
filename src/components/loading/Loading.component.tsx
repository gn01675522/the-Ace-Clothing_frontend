import type { FC } from "react";

import "./Loading.styles.scss";

export const Loading: FC = () => {
  return (
    <div className="loading">
      <div className="loader" />
    </div>
  );
};
