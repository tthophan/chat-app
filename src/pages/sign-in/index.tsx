import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/login";
import { auth } from "../../services/firebase.service";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      if (authUser) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  return <LoginComponent />;
};

export default Login;
