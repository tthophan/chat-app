import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { where } from "firebase/firestore";
import { Collection } from "../../../common/constants/collection.const";
import { IFirebaseToken } from "../../../interfaces/message.interface";
import { deleteDocument, getDocumentbyCondition, insertDocument, loginByEmail, requestPermission, signupByEmail } from "../../../services/firebase.service";
import { RootState } from "../../store/store";
import {
  createUserProfile,
  getUserProfileByUserId,
  setCurrentUser,
} from "../user/action";

export const setFcmInfo = createAction<IFirebaseToken>("auth/setFcmInfo");

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI: any
  ) => {
    const userCredential = await loginByEmail(
      email,
      password
    );
    if (!userCredential) return;
    const { uid: userId } = userCredential.user;
    const data = await thunkAPI.dispatch(getUserProfileByUserId(userId));
    if (!data) return;
    data.payload && thunkAPI.dispatch(setCurrentUser(data.payload));
  }
);

export const signupWithEmail = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    params: {
      signUpInfo: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    },
    thunkAPI: any
  ) => {
    const { signUpInfo } = params;
    const { email, password, firstName, lastName } = signUpInfo;
    const userCredential = await signupByEmail(
      email,
      password
    );
    if (!userCredential) return;
    const { uid } = userCredential.user;
    const data = await thunkAPI.dispatch(
      createUserProfile({
        user: {
          displayName: `${firstName} ${lastName}`,
          email,
          uid,
        },
      })
    );
    if (!data) return;
    data.payload && thunkAPI.dispatch(setCurrentUser(data.payload));
  }
);

export const registerFcmToken = createAsyncThunk(
  "auth/registerFcmToken",
  async (params: { userId: string }, thunkAPI: any) => {
    const { userId } = params;
    const firebseToken = await requestPermission();
    if (!firebseToken) return;
    let firebase =
      await getDocumentbyCondition<IFirebaseToken>(
        Collection.fcmTokens,
        [where("uid", "==", userId), where("token", "==", firebseToken)]
      );
    if (!firebase)
      firebase = await insertDocument<IFirebaseToken>(
        Collection.fcmTokens,
        {
          uid: userId,
          token: firebseToken,
        }
      );
    if (firebase) thunkAPI.dispatch(setFcmInfo(firebase));
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI: any) => {
    const { auth } = thunkAPI.getState() as RootState;
    if (!auth?.fcmInfo) return;
    await deleteDocument(
      Collection.fcmTokens,
      auth.fcmInfo.id!
    );
  }
);
