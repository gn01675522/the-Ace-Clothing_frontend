import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as LeftArrow } from "../../../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../../assets/right-arrow.svg";
import Indicator from "../../../../components/Indicator/Indicator.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../../components/Button/Button.component";

import { BANNER_DATA } from "./Banner.data";

import type { FC } from "react";

import "./Banner.styles.scss";

const Banner: FC = () => {
  const [imgNum, setImgNum] = useState(0);

  const onClickToChangeBanner = (type: "prev" | "next") => {
    switch (type) {
      case "prev":
        if (imgNum === 0) {
          setImgNum(BANNER_DATA.length - 1);
        } else {
          setImgNum(imgNum - 1);
        }
        break;
      case "next":
        if (imgNum === BANNER_DATA.length - 1) {
          setImgNum(0);
        } else {
          setImgNum(imgNum + 1);
        }
        break;
      default:
        return;
    }
  };

  const onChangeImg = (i: number) => {
    setImgNum(i);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (imgNum === BANNER_DATA.length - 1) {
        setImgNum(0);
      } else {
        setImgNum(imgNum + 1);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [imgNum]);

  return (
    <div className="banner">
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("prev")}
      >
        <LeftArrow className="banner__left-arrow" />
      </Button>
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("next")}
      >
        <RightArrow className="banner__right-arrow" />
      </Button>
      <div className="banner__content">
        <h1 className="banner__content-title">
          {BANNER_DATA[imgNum].sentence}
        </h1>
        <h2 className="banner__content-text">讓我們為您的生活</h2>
        <h2 className="banner__content-text">注入一些品味及獨特</h2>
      </div>
      <img
        className="banner__image"
        src={BANNER_DATA[imgNum].img}
        alt="banner images"
      />
      <Indicator
        imgCount={BANNER_DATA.length}
        imgNum={imgNum}
        onChangeImg={onChangeImg}
      />
      <Link className="banner__cta" to={BANNER_DATA[imgNum].url}>
        {BANNER_DATA[imgNum].text}
      </Link>
    </div>
  );
};

export default Banner;
