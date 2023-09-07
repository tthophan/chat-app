import React from "react";
import { Container } from "react-bootstrap";
import { IUser } from "../../../interfaces/message.interface";
import MessageHistoryComponent from "./message-history";
import MessageInputComponent from "./message-input";
import { useAppSelector } from "../../../redux/store/hooks";

interface IProps {
  userReceiver?: IUser;
}
const MessageBox: React.FC<IProps> = (props: IProps) => {
  const {receiver} = useAppSelector(state => state.chat);
  return (
    <Container>
      <h4>Chat with {receiver?.displayName ?? receiver?.email}</h4>
      <MessageHistoryComponent />
      <MessageInputComponent />
    </Container>
  );
};
export default MessageBox;
