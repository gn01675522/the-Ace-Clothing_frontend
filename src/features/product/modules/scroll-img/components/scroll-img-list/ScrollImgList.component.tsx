import { useScrollImgContext } from "../../hooks/scroll-img-list.hooks";

import type { FC } from "react";

import "./ScrollImgList.styles.scss";

export const ScrollImgList: FC = () => {
  const {
    detectAndResize: { imgContainerRef },
    imgControl: { imgPreviewRef },
    neededProductInfo: { title, imgSet },
  } = useScrollImgContext();

  return (
    <ul className="scroll-img-list" ref={imgPreviewRef}>
      {imgSet?.map((img, i) => (
        <li className="scroll-img-list__item" ref={imgContainerRef} key={i}>
          <img src={img} alt={`${title} ${i + 1}`} />
        </li>
      ))}
    </ul>
  );
};
