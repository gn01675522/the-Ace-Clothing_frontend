import { useState, useEffect, useRef } from "react";

import {
  Banner,
  FullWidthBanner,
  SplitBanner,
  ScrollList,
  SCROLL_CLASSES,
} from "../../features/marketing/index";

import { Categories } from "../../features/navigation/index";

import type { FC } from "react";

import "./Home.styles.scss";

const Home: FC = () => {
  const [firstBannerDetect, setFirstBannerDetect] = useState(false);
  const [thirdBannerDetect, setThirdBannerDetect] = useState(false);
  const scrollDetectParentRef = useRef<HTMLDivElement>(null);
  const firstBannerRef = useRef<HTMLDivElement>(null);
  const thirdBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstBanner = firstBannerRef.current;
    const thirdBanner = thirdBannerRef.current;

    const firstBannerDetector = new IntersectionObserver(
      ([entry]) => setFirstBannerDetect(entry.isIntersecting),
      {
        root: null,
        threshold: 0.1,
      }
    );
    const thirdBannerDetect = new IntersectionObserver(
      ([entry]) => setThirdBannerDetect(entry.isIntersecting),
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (firstBanner) {
      firstBannerDetector.observe(firstBanner);
    }
    if (thirdBanner) {
      thirdBannerDetect.observe(thirdBanner);
    }
    return () => {
      if (firstBanner) {
        firstBannerDetector.unobserve(firstBanner);
      }
      if (thirdBanner) {
        thirdBannerDetect.unobserve(thirdBanner);
      }
    };
  }, []);

  return (
    <>
      <div className="home" ref={scrollDetectParentRef}>
        <Banner />
        <div className="home__discount">
          <div className="home__discount-content">
            <h3>Grand Opening Sale</h3>
            <h2>EXTRA 30% OFF SALE</h2>
            <p>
              慶祝您我的相遇，也歡迎您加入我們的旅程，輸入 newBeginning
              即可享全品項 7 折優惠！
            </p>
          </div>
        </div>
        <div className="home__session">
          <h2 className="home__session-title">開始選購</h2>
          <Categories />
        </div>
        <div className="home__session">
          <h2 className="home__session-title">新到貨</h2>
          <ScrollList type={SCROLL_CLASSES.newArrival} />
        </div>
        <div className="home__session" ref={firstBannerRef}>
          <SplitBanner type="women" inView={firstBannerDetect ? true : false} />
        </div>
        <div className="home__session">
          <FullWidthBanner type="boho" />
        </div>
        <div className="home__session" ref={thirdBannerRef}>
          <SplitBanner type="men" inView={thirdBannerDetect ? true : false} />
        </div>
        <div className="home__session">
          <FullWidthBanner type="urban" />
        </div>
        <div className="home__session">
          <h2 className="home__session-title">促銷</h2>
          <ScrollList type={SCROLL_CLASSES.onSale} />
        </div>
      </div>
    </>
  );
};

export default Home;
