import { Link } from "react-router-dom";

import { SESSION_CONTENT_DATA } from "../../config/session.data";

import type { FC } from "react";

import "./FullWidthBanner.styles.scss";

type PropsType = {
  type: "boho" | "urban";
};
const FullWidthBanner: FC<PropsType> = ({ type }) => {
  const data = SESSION_CONTENT_DATA.fullWidthBanner[type];
  const { title, sentence, img, link } = data;

  return (
    <div className="full-width-banner">
      <img
        className="full-width-banner__img"
        src={img}
        alt={`banner: ${title}`}
      />
      <section className="full-width-banner__content">
        <h2 className="full-width-banner__content-title">{title}</h2>
        <p className="full-width-banner__content-sentence">{sentence}</p>
        <Link className="full-width-banner__content-link" to={link}>
          選購
        </Link>
      </section>
    </div>
  );
};

export default FullWidthBanner;
