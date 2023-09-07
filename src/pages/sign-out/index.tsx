import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut as signOutAction } from "../../redux/slices/auth/action";
import { useAppDispatch } from "../../redux/store/hooks";
import { auth } from "../../services/firebase.service";

const SignOut: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) signOut(auth);
    dispatch(signOutAction());
    navigate("/sign-in");
  }, [dispatch, navigate, user]);
  return <>Logout...</>;
};
export default SignOut;
