import { Link } from "react-router-dom";

import {
  FacebookSVGIcon,
  LineSVGIcon,
  InstagramSVGIcon,
} from "../../../../components/index";

import { FOOTER_CONFIG } from "../../config/footer.config";

import type { FC } from "react";

import "./FooterContent.styles.scss";

const SYMBOL_TYPE = {
  facebook: "Facebook",
  instagram: "Instagram",
  line: "Line",
};

const symbol = (type: string) =>
  ({
    [SYMBOL_TYPE.facebook]: <FacebookSVGIcon className="facebook-icon" />,
    [SYMBOL_TYPE.instagram]: <InstagramSVGIcon className="instagram-icon" />,
    [SYMBOL_TYPE.line]: <LineSVGIcon className="line-icon" />,
  }[type]);

export const FooterContent: FC = () => {
  return (
    <section className="footer-content">
      <ul className="footer-content__ul">
        <li className="footer-content__ul-title">
          {FOOTER_CONFIG.about.title}
        </li>
        {FOOTER_CONFIG.about.items.map((item) => (
          <li className="footer-content__items" key={item.title}>
            <Link to={item.link}>
              <div>{item.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="footer-content__ul">
        <li className="footer-content__ul-title">
          {FOOTER_CONFIG.about.title}
        </li>
        {FOOTER_CONFIG.service.items.map((item) => (
          <li className="footer-content__items" key={item.title}>
            <Link to={item.link}>
              <div>{item.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="footer-content__ul">
        <li className="footer-content__ul-title">
          {FOOTER_CONFIG.about.title}
        </li>
        {FOOTER_CONFIG.contact.items.map((item) => (
          <li className="footer-content__items" key={item.title}>
            <div className="footer-content__items-number">
              <span>{item.title}</span>
              <span>{item.number}</span>
            </div>
          </li>
        ))}
      </ul>
      <ul className="footer-content__ul">
        <li className="footer-content__ul-title">
          {FOOTER_CONFIG.about.title}
        </li>
        {FOOTER_CONFIG.follow.items.map((item) => (
          <li className="footer-content__items" key={item.title}>
            <Link to={item.website} target="_blank">
              <div className="footer-content__items-website">
                {symbol(item.title)}
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
