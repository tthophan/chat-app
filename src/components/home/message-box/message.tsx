import React, { useEffect, useMemo, useRef } from "react";
import { Image } from "react-bootstrap";
import { useIsInViewport } from "../../../hooks/viewport.hook";
import { IMessage } from "../../../interfaces/message.interface";
import { readMessage } from "../../../redux/slices/chat/action";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

interface IProps {
  message: IMessage;
  type: "outgoing" | "incoming";
}

const MessageComponent: React.FC<IProps> = ({ message, type }: IProps) => {
  const ref = useRef<any>();
  const isInViewport = useIsInViewport(ref);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((selector) => selector.user);

  useEffect(() => {
    if (message.unRead && isInViewport && message.sender !== user.uid) {
      dispatch(readMessage({ messageId: message.id! }));
    }
  }, [isInViewport, user, message, dispatch]);

  const content = useMemo(() => {
    const { text, createdAt } = message;

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long", // 'short' or 'numeric' for different formats
      day: "numeric",
      hour: "2-digit", // 'numeric', '2-digit', 'numeric', '2-digit' for time
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(createdAt!));
    return {
      incoming: (
        <div className="incoming_msg" ref={ref}>
          <div className="incoming_msg_img">
            <Image src="https://ptetutorials.com/images/user-profile.png" />
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{text}</p>
              <span className="time_date">{formattedDate}</span>
            </div>
          </div>
        </div>
      ),
      outgoing: (
        <div className="outgoing_msg" ref={ref}>
          <div className="sent_msg">
            <p>{text}</p>
            <span className="time_date">{formattedDate}</span>
          </div>
        </div>
      ),
    }[type];
  }, [type, message]);

  return content;
};
export default MessageComponent;
