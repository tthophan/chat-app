import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeComponent from "../../components/home";
import { registerFcmToken } from "../../redux/slices/auth/action";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { onMessageListener } from "../../services/firebase.service";

const Home: React.FC = () => {
  const { user } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (!user) return;
    dispatch(registerFcmToken({ userId: user.id! }));
    const unsubscribe = onMessageListener().then(({ notification }: any) => {
      console.log("[NOTIFICATION] RECEIVED");
      setNotification({
        ...notification,
      });
    });

    return () => {
      unsubscribe.catch((err: any) => console.log("failed: ", err));
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (notification?.body)
      toast(notification.body, {
        type: "default",
        autoClose: 200,
        position: "top-center",
      });
  }, [notification]);

  return <HomeComponent />;
};

export default Home;
