import { FooterContent } from "../../components/footer-content/FooterContent.component";
import { FooterCopyright } from "../../components/footer-copyright/FooterCopyright.component";

import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <>
      <FooterContent />
      <FooterCopyright />
    </>
  );
};
