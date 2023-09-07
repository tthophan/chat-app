import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { limit, orderBy, startAfter, where } from "firebase/firestore";
import _ from "lodash";
import { Collection } from "../../../common/constants/collection.const";
import {
  IChannel,
  IMessage,
  IUser,
} from "../../../interfaces/message.interface";
import { Pusher } from "../../../services";
import {
  getDocumentbyCondition,
  getDocuments,
  insertDocument,
  readMessage as readMsg,
} from "../../../services/firebase.service";
import { RootState } from "../../store/store";

export const setReceiver = createAction<IUser>("chat/setReceiver");

export const setReceiverChannel = createAction<IChannel>(
  "chat/setReceiverChannel"
);

export const setMessages = createAction<{
  [k: string]: {
    last: number;
    pageSize: number;
    messages: Array<IMessage>;
  };
}>("chat/setMessages");

export const setActiveChannel = createAction<string>("chat/setActiveChannel");

export const setIsRollable = createAction<boolean>("chat/isRollable");

export const setCurrentMessages = createAction<string>(
  "chat/setCurrentMessages"
);
export const setLoadMessage = createAction<boolean>("chat/setLoadMessage");

export const setChatList = createAction<Array<IUser>>("chat/setChatList");

export const submitChat = createAsyncThunk(
  "chat/submitChat",
  async (params: { message: IMessage }, thunkAPI: any) => {
    const { message } = params;
    const payload = await insertDocument<IMessage>(Collection.messages, {
      ...message,
    });
    await Pusher.sendMessage(payload!);
  }
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (params: { take: number; channel: string }, thunkAPI: any) => {
    const { take } = params;
    const { chat: ChatState } = thunkAPI.getState() as RootState;
    const channelId = ChatState.activeChannel;
    const cursor = _.get(ChatState, ["messages", channelId, "last"], 0);
    const conditions: Array<any> = [
      where("channelId", "==", channelId),
      orderBy("createdAt", "desc"),
    ];

    if (cursor) conditions.push(startAfter(cursor));

    conditions.push(limit(take));
    const messages = await getDocuments<IMessage>(
      Collection.messages,
      conditions
    );

    await thunkAPI.dispatch(
      patchMessage({
        channelId,
        messages: _.uniqBy(
          [...messages].sort((a, b) => a.createdAt! - b.createdAt!),
          "id"
        ),
      })
    );
  }
);

export const activateChannel = createAsyncThunk(
  "chat/getOrCreateChannel",
  async (params: { senderId: string; receiverId: string }, thunkAPI: any) => {
    const { senderId, receiverId } = params;
    if (!senderId || !receiverId) return;

    const {
      chat: { receiverChannels },
    } = thunkAPI.getState() as RootState;
    let channel =
      receiverChannels.find(
        (x) =>
          (x.senderId === senderId && x.receiverId === receiverId) ||
          (x.receiverId === senderId && x.senderId === receiverId)
      ) || null;

    if (!channel)
      channel = await getDocumentbyCondition<IChannel>(Collection.channel, [
        where("senderId", "in", [senderId, receiverId]),
        where("receiverId", "in", [senderId, receiverId]),
      ]);
    if (!channel) {
      channel = await insertDocument<IChannel>(Collection.channel, {
        senderId: senderId,
        receiverId: receiverId,
      });
    }
    if (!channel) return;

    await thunkAPI.dispatch(
      setReceiverChannel({
        ...channel,
      })
    );
    const channelId = channel!.id!;
    const pusherChannel = Pusher.subscribe(channelId);

    await thunkAPI.dispatch(setActiveChannel(channelId));
    pusherChannel.bind("message", async (message: IMessage) => {
      await thunkAPI.dispatch(
        patchMessage({
          channelId: message.channelId,
          messages: [message],
        })
      );
      await thunkAPI.dispatch(setIsRollable(true));
    });
  }
);

export const patchMessage = createAsyncThunk(
  "chat/patchMessage",
  async (
    params: { messages: Array<IMessage>; channelId: string },
    thunkAPI: any
  ) => {
    const {
      chat: { messages },
    } = thunkAPI.getState() as RootState;
    const { channelId, messages: newMessages } = params;

    const msg = {
      ...messages,
      [channelId]: {
        ...messages[channelId],
        pageSize: 10,
        last: messages[channelId]?.last ?? _.first(newMessages)?.createdAt ?? 0,
        messages: _.unionBy(
          [..._.get(messages, [channelId, "messages"], []), ...newMessages],
          "id"
        ),
      },
    };
    await thunkAPI.dispatch(setMessages(msg));
  }
);

export const getChatList = createAsyncThunk(
  "chat/getUsers",
  async (params: { take: number }, thunkAPI: any) => {
    const { take } = params;
    const {
      user: { user },
    } = thunkAPI.getState() as RootState;
    const conditions: Array<any> = [
      where("uid", "!=", user.uid),
      orderBy("uid", "desc"),
    ];

    if (take) conditions.push(limit(take));
    const users = await getDocuments<IUser>(Collection.users, conditions);
    thunkAPI.dispatch(setChatList(users));
  }
);

export const readMessage = createAsyncThunk(
  "chat/readMessage",
  async (params: { messageId: string }, thunkAPI: any) => {
    const { messageId } = params;
    await readMsg(messageId);
  }
);
