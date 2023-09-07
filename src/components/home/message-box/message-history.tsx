import React, { useEffect, useRef, useState } from "react";
import { IMessage } from "../../../interfaces/message.interface";
import {
  getMessages,
  setIsRollable,
  setLoadMessage,
} from "../../../redux/slices/chat/action";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import MessageComponent from "./message";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
interface IProps {}
const MessageHistoryComponent: React.FC<IProps> = () => {
  const scrollableRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const [messageHistories, setMessageHistories] = useState<Array<IMessage>>([]);
  const { user } = useAppSelector((selector) => selector.user);
  const { messages, activeChannel, isRollable, loading } = useAppSelector(
    (state) => state.chat
  );
  const dispatch = useAppDispatch();

  // Effect for initial loading and channel change
  useEffect(() => {
    if (activeChannel) {
      dispatch(getMessages({ take: 10, channel: activeChannel })).finally(
        () => {
          dispatch(setIsRollable(true));
        }
      );
    }
  }, [activeChannel, dispatch]);

  useEffect(() => {
    if (!isRollable) return;
    dispatch(setIsRollable(false));
    scrollToBottom();
  }, [isRollable, dispatch]);

  // Scroll to the bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollableRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }, 0);
  };

  // Effect for updating messageHistories when messages change
  useEffect(() => {
    setMessageHistories([...(messages[activeChannel]?.messages ?? [])]);
  }, [messages, activeChannel]);

  const loadMoreMessages = () => {
    dispatch(setLoadMessage(true));
    dispatch(getMessages({ take: 10, channel: activeChannel })).finally(() =>
      dispatch(setLoadMessage(false))
    );
  };

  return (
    <>
      <div className="msg_history" ref={scrollableRef}>
        <div className="text-center">
          {!!loading ? (
            <Spinner animation="grow" />
          ) : (
            <div className="more" onClick={loadMoreMessages}>
              <Button variant="link">Load More</Button>
            </div>
          )}
        </div>
        {messageHistories?.map((message) => {
          const type = message.sender === user?.uid ? "outgoing" : "incoming";
          return (
            <MessageComponent key={message.id} message={message} type={type} />
          );
        })}
      </div>
    </>
  );
};
export default MessageHistoryComponent;
