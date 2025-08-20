import { Link } from "react-router-dom";

import { SESSION_CONTENT_DATA } from "../../../../features/marketing/config/session.data";

import type { FC } from "react";

import "./SplitBanner.styles.scss";

type PropsType = {
  type: "women" | "men";
  inView: boolean;
};

export const SplitBanner: FC<PropsType> = ({ type, inView }) => {
  const data = SESSION_CONTENT_DATA.splitBanner[type];
  const { title, sentence, img, link } = data;
  const btnContent = `選購${type === "women" ? "女" : "男"}裝`;

  return (
    <div className={`split-banner split-banner${type === "men" ? "-men" : ""}`}>
      <div
        className={`split-banner__left ${
          inView ? "split-banner__left--active" : ""
        }`}
      >
        <h2 className="split-banner__left-title">{title}</h2>
        <p className="split-banner__left-sentence">{sentence}</p>
        <Link className="split-banner__left-btn" to={link}>
          {btnContent}
        </Link>
      </div>
      <div className="split-banner__right">
        <Link to={link} aria-label={`${type}'s shop`}>
          <img
            className={`split-banner__right-img${
              type === "men" ? "-men" : ""
            } ${inView ? "split-banner__right-img--active" : ""}`}
            src={img}
            alt={`banner: ${btnContent}`}
          />
        </Link>
      </div>
    </div>
  );
};
