import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpComponent from "../../components/signup";
import { auth } from "../../services/firebase.service";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      if(authUser) navigate("./")
    });
    return () => unsubscribe();
  }, [navigate]);

  return <SignUpComponent />;
};

export default Signup;
