import { Link } from "react-router-dom";

import type { FC } from "react";

import "./FooterCopyright.styles.scss";

export const FooterCopyright: FC = () => {
  return (
    <p className="footer-copyright">
      © 本網站為個人練習作品，無作任何商業用途使用；原始碼請見{" "}
      <Link
        className="footer-copyright__link"
        target="_blank"
        to="https://github.com/gn01675522/the-Ace-clothing"
      >
        Github
      </Link>
      。
    </p>
  );
};
