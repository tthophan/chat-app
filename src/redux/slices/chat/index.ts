import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import {
  IChannel,
  IMessage,
  IUser,
} from "../../../interfaces/message.interface";
import {
  setActiveChannel,
  setChatList,
  setIsRollable,
  setLoadMessage,
  setMessages,
  setReceiver,
  setReceiverChannel,
} from "./action";

type ChatState = {
  receiver: IUser;
  messages: {
    [k: string]: {
      last: number;
      pageSize: number;
      messages: Array<IMessage>;
    };
  };
  receiverChannels: Array<IChannel>;
  activeChannel: string;
  isRollable: boolean;
  chatList: Array<IUser>;
  loading: boolean;
};

const initialState: ChatState = {
  receiver: { displayName: "", email: "", uid: "" },
  messages: {},
  receiverChannels: [],
  activeChannel: "",
  isRollable: false,
  chatList: [],
  loading: false,
};

const ChatSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setReceiver, (state, action) => {
        state.receiver = action.payload;
      })
      .addCase(setMessages, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(setReceiverChannel, (state, action) => {
        state.receiverChannels = _.uniqBy(
          [...state.receiverChannels, action.payload],
          "channelId"
        );
      })
      .addCase(setActiveChannel, (state, action) => {
        state.activeChannel = action.payload;
      })
      .addCase(setIsRollable, (state, action) => {
        state.isRollable = action.payload;
      })
      .addCase(setChatList, (state, action) => {
        state.chatList = action.payload;
      })
      .addCase(setLoadMessage, (state, action) => {
        state.loading = action.payload;
      });
  },
});

export default ChatSlice.reducer;
