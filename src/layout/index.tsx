import React from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import withAuthRedirect from "../components/auth-redirect";
import Home from "../pages/home";
import Login from "../pages/sign-in";
import SignOut from "../pages/sign-out";
import Signup from "../pages/signup";

const HomeComponent = withAuthRedirect(Home)
const Layout: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" Component={HomeComponent} />
          <Route path="/sign-in" Component={Login} />
          <Route path="/sign-up" Component={Signup} />
          <Route path="/sign-out" Component={SignOut} />
        </Routes>
      </Container>
    </Router>
  );
};
export default Layout;
