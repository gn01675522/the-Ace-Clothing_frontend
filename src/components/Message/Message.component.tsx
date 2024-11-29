import CrossSVGIcon from "../SVGIcons/CrossSVGIcon.component";
import CheckSVGIcon from "../SVGIcons/CheckSVGIcon.component";

import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/message.selector";

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

const Message = () => {
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

export default Message;
