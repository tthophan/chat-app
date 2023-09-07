import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../redux/slices/auth/action";
import { useAppDispatch } from "../../redux/store/hooks";
import "./login.css";

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onSignIn = async (event: any) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const onSignUp = () => navigate("/sign-up");

  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Chat Application
            <br /> Login Page
          </h2>
          <p>Login from here to access.</p>
        </div>
      </div>
      <Container>
        <Row className="main">
          <Col md={6} sm={12}>
            <div className="login-form">
              <Form>
                <Form.Group controlId="email-address">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    className="mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={onSignIn} variant="primary" type="button">
                  Sign In
                </Button>{" "}
                <Button
                  onClick={onSignUp}
                  variant="secondary"
                  className="ml-3"
                  type="button"
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LoginComponent;
