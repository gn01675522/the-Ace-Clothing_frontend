import { Link } from "react-router-dom";
import { useCarousel } from "../../hooks/marketing.hooks";

import {
  Button,
  BUTTON_TYPE_CLASS,
  Indicator,
  LeftArrowSVGIcon,
  RightArrowSVGIcon,
} from "../../../../components/index";

import { BANNER_CONFIG } from "../../config/banner.config";

import type { FC } from "react";

import "./Banner.styles.scss";

export const Banner: FC = () => {
  const { imgNum, onClickToChangeBanner, onChangeImg } = useCarousel();

  return (
    <div className="banner">
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("prev")}
      >
        <LeftArrowSVGIcon className="banner__left-arrow" />
      </Button>
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("next")}
      >
        <RightArrowSVGIcon className="banner__right-arrow" />
      </Button>
      <div className="banner__content">
        <h1 className="banner__content-title">
          {BANNER_CONFIG[imgNum].sentence}
        </h1>
        <h2 className="banner__content-text">讓我們為您的生活</h2>
        <h2 className="banner__content-text">注入一些品味及獨特</h2>
      </div>
      <img
        className="banner__image"
        src={BANNER_CONFIG[imgNum].img}
        alt="banner images"
      />
      <Indicator
        imgCount={BANNER_CONFIG.length}
        imgNum={imgNum}
        onChangeImg={onChangeImg}
      />
      <Link className="banner__cta" to={BANNER_CONFIG[imgNum].url}>
        {BANNER_CONFIG[imgNum].text}
      </Link>
    </div>
  );
};
