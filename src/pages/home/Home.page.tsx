import {
  Banner,
  FullWidthBanner,
  SplitBanner,
  DiscountBanner,
  ScrollList,
  SCROLL_CLASSES,
  useIntersectionObserver,
} from "../../features/marketing/index";

import { Categories } from "../../features/navigation/index";

import type { FC } from "react";

import "./Home.styles.scss";

const Home: FC = () => {
  const {
    firstBannerDetect,
    thirdBannerDetect,
    firstBannerRef,
    thirdBannerRef,
  } = useIntersectionObserver();

  return (
    <div className="home">
      <Banner />
      <DiscountBanner />
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
  );
};

export default Home;
