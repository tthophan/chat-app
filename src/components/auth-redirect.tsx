import "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase.service";

const withAuthRedirect = (WrappedComponent: any) => {
  return function AuthRedirectWrapper(props: any) {
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
        if(!authUser) navigate("./sign-in")
      });
      return () => unsubscribe();
    }, [navigate]);

    return  <WrappedComponent {...props} />
  };
};

export default withAuthRedirect;
