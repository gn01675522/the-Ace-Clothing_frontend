import ReactLoading from "react-loading";

import type { FC } from "react";

import "./Loading.styles.scss";

export const Loading: FC = () => {
  return (
    <>
      <div className="loading">
        <ReactLoading type="bubbles" color="white" height={200} width={200} />
      </div>
    </>
  );
};
