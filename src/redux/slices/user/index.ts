import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/message.interface";
import { setCurrentUser } from "./action";

type userState = {
  user: IUser;
};

const initialState: userState = {
  user: { displayName: "", email: "", uid: "" },
};

const UserSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setCurrentUser, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default UserSlice.reducer;