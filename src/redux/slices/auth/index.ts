import { createSlice } from "@reduxjs/toolkit";
import { setFcmInfo } from "./action";
import { IFirebaseToken } from "../../../interfaces/message.interface";

type authState = {
  detailLoading: boolean;
  detailData: any;
  submitLoading: boolean;
  fcmInfo?: IFirebaseToken;
};

const initialState: authState = {
  detailLoading: true,
  detailData: {},
  submitLoading: false,
  fcmInfo: undefined,
};
const AuthSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setFcmInfo, (state, action) => {
      state.fcmInfo = action.payload;
    });
  },
});
export default AuthSlice.reducer;
