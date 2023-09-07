import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { where } from "firebase/firestore";
import { Collection } from "../../../common/constants/collection.const";
import { IUser } from "../../../interfaces/message.interface";
import { getDocumentbyCondition, insertDocument } from "../../../services/firebase.service";

export const setCurrentUser = createAction<IUser>("user/setCurrentUser");

export const getUserProfileByUserId = createAsyncThunk(
  "user/getUserById",
  async (userId: string, thunkAPI: any) => {
    return await getDocumentbyCondition(
      Collection.users,
      [where("uid", "==", userId)]
    );
  }
);

export const createUserProfile = createAsyncThunk(
  "user/getUserById",
  async (params: { user: IUser }, thunkAPI: any) => {
    const { user } = params;
    return await insertDocument(
      Collection.users,
      user
    );
  }
);
