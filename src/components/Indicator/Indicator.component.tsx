import type { FC } from "react";

import "./Indicator.styles.scss";

type IndicatorProps = {
  imgCount: number;
  imgNum: number;
  onChangeImg: (i: number) => void;
};

export const Indicator: FC<IndicatorProps> = ({
  imgCount,
  imgNum,
  onChangeImg,
}) => {
  const indicator = [...new Array(imgCount)].map((_, i) => (
    <div
      className={`indicator__dots ${
        i === imgNum ? "indicator__dots--active" : ""
      }`}
      key={i}
      onClick={() => onChangeImg(i)}
    />
  ));
  return <div className="indicator">{indicator}</div>;
};
