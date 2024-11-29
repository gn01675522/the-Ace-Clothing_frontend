import { Link } from "react-router-dom";
import "./InfoSource.styles.scss";

import AceSVGIcon from "../../components/SVGIcons/AceSVGIcon.component";
import LineSVGIcon from "../../components/SVGIcons/LineSVGIcon.component";
import InstagramSVGIcon from "../../components/SVGIcons/InstagramSVGIcon.component";
import FacebookSVGIcon from "../../components/SVGIcons/FacebookSVGIcon.component";
import CartSVGIcon from "../../components/SVGIcons/CartSVGIcon.component";
import NoImageSVGLogo from "../../components/SVGIcons/NoImageSVGLogo.component";
import WhiteHeartSVGIcon from "../../components/SVGIcons/WhiteHeartSVGIcon.component";
import RedHeartSVGIcon from "../../components/SVGIcons/RedHeartSVGIcon.component";
import CheckSVGIcon from "../../components/SVGIcons/CheckSVGIcon.component";
import CrossSVGIcon from "../../components/SVGIcons/CrossSVGIcon.component";
import LeftArrowSVGIcon from "../../components/SVGIcons/LeftArrowSVGIcon.component";
import RightArrowSVGIcon from "../../components/SVGIcons/RightArrowSVGIcon.component";
import hexSchool from "../../assets/hexSchool.png";

import { INFO_SOURCE_DATA } from "./infoSource.data";

const { logos, icons, pictures, apis } = INFO_SOURCE_DATA;

const INFO_CATEGORY = [
  { category: "logos", data: logos },
  { category: "icons", data: icons },
  { category: "pictures", data: pictures },
  { category: "apis", data: apis },
];

enum CATEGORY_TYPE {
  logos = "logos",
  icons = "icons",
  pictures = "pictures",
  apis = "apis",
}

const attachment = (
  category: CATEGORY_TYPE
): (JSX.Element | string)[] | string[] | undefined =>
  ({
    [CATEGORY_TYPE.logos]: [
      <AceSVGIcon className="info-source__card-view-img" />,
    ],
    [CATEGORY_TYPE.icons]: [
      <CartSVGIcon className="info-source__card-view-img" />,
      <InstagramSVGIcon className="info-source__card-view-img" />,
      <FacebookSVGIcon className="info-source__card-view-img" />,
      <LineSVGIcon className="info-source__card-view-img" />,
      <RedHeartSVGIcon className="info-source__card-view-img" />,
      <WhiteHeartSVGIcon className="info-source__card-view-img" />,
      <CheckSVGIcon className="info-source__card-view-img" />,
      <CrossSVGIcon className="info-source__card-view-img" />,
      <LeftArrowSVGIcon className="info-source__card-view-img" />,
      <RightArrowSVGIcon className="info-source__card-view-img" />,
    ],
    [CATEGORY_TYPE.pictures]: [
      "https://images.unsplash.com/photo-1611162618828-bc409f073cbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      <NoImageSVGLogo className="info-source__card-view-img" />,
    ],
    [CATEGORY_TYPE.apis]: [hexSchool],
  }[category]);

const InfoSource = () => {
  return (
    <div className="info-source">
      <h1 className="info-source__title">網站資料來源</h1>
      {INFO_CATEGORY.map((item) => (
        <div className="info-source__content" key={item.category}>
          <h2 className="info-source__content-title">{item.category} 出處</h2>
          <div className="info-source__content-main">
            {item.data.map((data, i) => {
              const AttachmentImg = attachment(
                item.category as CATEGORY_TYPE
              )?.[i];
              return (
                <div className="info-source__card" key={data.title}>
                  <div className="info-source__card-content">
                    <div>
                      <span>名稱：</span>
                      <h3 className="info-source__card-title">{data.title}</h3>
                    </div>

                    <div>
                      <span>作者：</span>
                      <Link to={data.url} target="_blank">
                        <h3 className="info-source__card-author">
                          {data.createBy}
                        </h3>
                      </Link>
                    </div>
                    <div>
                      <span>來源：</span>
                      <Link to={data.source.url}>
                        <h3 className="info-source__card-source">
                          {data.source.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="info-source__card-view">
                    {typeof AttachmentImg === "string" ? (
                      <img
                        src={AttachmentImg}
                        className="info-source__card-view-img"
                        alt={`${data.title} from ${data.source.title}`}
                      />
                    ) : (
                      AttachmentImg
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSource;
