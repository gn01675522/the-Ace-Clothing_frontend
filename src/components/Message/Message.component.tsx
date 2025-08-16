import { CrossSVGIcon } from "../SVG-icons/CrossSVGIcon.component";
import { CheckSVGIcon } from "../SVG-icons/CheckSVGIcon.component";

import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/message.selector";

import type { FC } from "react";

import "./Message.styles.scss";

enum MESSAGE_TYPE {
  success = "success",
  danger = "danger",
}

const getIcon = (type: MESSAGE_TYPE) =>
  ({
    [MESSAGE_TYPE.success]: CheckSVGIcon,
    [MESSAGE_TYPE.danger]: CrossSVGIcon,
  }[type]);

export const Message: FC = () => {
  const message = useSelector(selectMessage);
  const { type, text } = message;
  const MessageIcon = getIcon(type as MESSAGE_TYPE);

  return (
    <>
      <div className="message">
        <div className="message__left">
          <MessageIcon className="message__left-icon" />
        </div>
        <div className="message__right">
          <div className="message__right-content">
            <span>{text}</span>
          </div>
        </div>
      </div>
    </>
  );
};
