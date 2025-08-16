import "./AboutUs.styles.scss";
import { ABOUT_US_DATA } from "./aboutUs.data";

const { first, second, third } = ABOUT_US_DATA;

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="about-us__title">關於 the Ace</h1>
      <div className="about-us__content">
        <section className="about-us__content-left">
          <img
            className="about-us__content-left-img"
            src={first.img}
            alt="Three men are sitting together."
          />
          <div className="about-us__content-left-section">
            <h2 className="about-us__content-left-section-title">
              {first.title}
            </h2>
            {first.content}
          </div>
        </section>

        <section className="about-us__content-right">
          <div className="about-us__content-right-section">
            <h2 className="about-us__content-right-section-title">
              {second.title}
            </h2>
            {second.content}
          </div>
          <img
            className="about-us__content-right-img"
            src={second.img}
            alt="Several jackets are hanging on the wall."
          />
        </section>

        <section className="about-us__content-stack">
          <div className="about-us__content-stack-section">
            <h2 className="about-us__content-stack-section-title">
              {third.title}
            </h2>
            {third.content}
          </div>
          <img
            className="about-us__content-stack-img"
            src={third.img}
            alt="A woman is sitting in a camper van, as if she is about to go on a trip."
          />
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
