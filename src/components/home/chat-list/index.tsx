import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { IUser } from "../../../interfaces/message.interface";
import {
  activateChannel,
  getChatList,
  setReceiver,
} from "../../../redux/slices/chat/action";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";

interface IProps {}
const ChatList: React.FC<IProps> = (props: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { receiver, chatList } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!receiver || !user) return;
    dispatch(
      activateChannel({
        senderId: receiver.uid,
        receiverId: user.uid,
      })
    );
  }, [dispatch, receiver, user]);

  useEffect(() => {
    if (!user) return;
    dispatch(getChatList({ take: 100 }));
  }, [dispatch, user]);

  const handleUserClick = (userSelected: IUser) => {
    if (!user) return;
    if (receiver?.uid === userSelected.uid) return;

    dispatch(setReceiver(userSelected));
    dispatch(
      activateChannel({
        senderId: user.uid,
        receiverId: userSelected.uid,
      })
    );
  };

  return (
    <>
      <h4>Inbox</h4>
      <ListGroup className="user-list">
        {chatList?.map((user, index) => (
          <ListGroup.Item
            key={index}
            active={user?.uid === receiver?.uid}
            onClick={() => handleUserClick(user)}
            role="button"
          >
            <div className="chat_people">
              <div className="chat_img">
                <img
                  src="https://ptetutorials.com/images/user-profile.png"
                  alt="sunil"
                />
              </div>
              <div className="chat_ib">
                <h5>
                  {user.displayName}
                  <span className="chat_date">Dec 25</span>
                </h5>
                <p>{user.email}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
export default ChatList;
