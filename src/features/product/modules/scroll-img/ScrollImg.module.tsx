import { ScrollImgList } from "./components/scroll-img-list/ScrollImgList.component";

import { ScrollImgContextProvider } from "./contexts/scroll-img.contexts";

import { useScrollImgContext } from "./hooks/scroll-img-list.hooks";

import { Button, BUTTON_TYPE_CLASS } from "../../../../components/index";

import type { FC } from "react";
import type { UserProductsDto } from "../../DTOs/userProduct.dtos";

import "./ScrollImg.styles.scss";

const ScrollImgContent: FC = () => {
  const {
    imgControl: { onChangeImg },
  } = useScrollImgContext();

  return (
    <div className="scroll-img">
      <ScrollImgList />
      <Button
        buttonType={BUTTON_TYPE_CLASS.rectWhiteOpacityLSm}
        onClick={() => onChangeImg("prev")}
      />
      <Button
        buttonType={BUTTON_TYPE_CLASS.rectWhiteOpacityRSm}
        onClick={() => onChangeImg("next")}
      />
    </div>
  );
};

type PropsType = {
  targetProduct: UserProductsDto | null;
};

export const ScrollImg: FC<PropsType> = ({ targetProduct }) => {
  return (
    <ScrollImgContextProvider targetProduct={targetProduct}>
      <ScrollImgContent />
    </ScrollImgContextProvider>
  );
};
