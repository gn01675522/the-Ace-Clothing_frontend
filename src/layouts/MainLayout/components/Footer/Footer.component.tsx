import { Link } from "react-router-dom";

import { ReactComponent as Facebook } from "../../../../assets/facebook.svg";
import { ReactComponent as Line } from "../../../../assets/line.svg";
import { ReactComponent as Instagram } from "../../../../assets/instagram.svg";

import { FOOTER_DATA } from "./footer.data";

import type { FC } from "react";

import "./Footer.styles.scss";

const SYMBOL_TYPE = {
  facebook: "Facebook",
  instagram: "Instagram",
  line: "Line",
};

const symbol = (type: string) =>
  ({
    [SYMBOL_TYPE.facebook]: <Facebook className="facebook-icon" />,
    [SYMBOL_TYPE.instagram]: <Instagram className="instagram-icon" />,
    [SYMBOL_TYPE.line]: <Line className="line-icon" />,
  }[type]);

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        {FOOTER_DATA.map((data) => (
          <ul className="footer__content-ul" key={data.title}>
            <li className="footer__content-ul-title">{data.title}</li>

            {data.items.map((item) => (
              <li className="footer__content-items" key={item.title}>
                {item?.link ? (
                  <Link to={item.link}>
                    <div>{item.title}</div>
                  </Link>
                ) : item.number ? (
                  <div className="footer__content-items-number">
                    <span>{item.title}</span>
                    <span>{item.number}</span>
                  </div>
                ) : (
                  <Link to={item.website!} target="_blank">
                    <div className="footer__content-items-website">
                      {symbol(item.title)}
                      {item.title}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="footer__copyright">
        © 本網站為個人練習作品，無作任何商業用途使用；原始碼請見{" "}
        <Link
          className="footer__copyright-link"
          target="_blank"
          to="https://github.com/gn01675522/the-Ace-clothing"
        >
          Github
        </Link>
        。
      </p>
    </footer>
  );
};

export default Footer;
