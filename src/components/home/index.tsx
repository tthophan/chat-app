import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatList from "./chat-list";
import Header from "./header";
import "./index.css";
import MessageBox from "./message-box";

const HomeComponent: React.FC = () => {
  return (
    <>
      <Header />
      <Container fluid className="home-chat">
        <Row>
          <Col sm={4}>
            <ChatList
            />
          </Col>
          <Col sm={8}>
            <MessageBox />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomeComponent;
