import axios from "axios";
import PusherClient from "pusher-js";
import { Configs } from "../common/constants";
import { IMessage } from "../interfaces/message.interface";

const pusher = new PusherClient("6d3bd0a22a06957f0e13", {
  cluster: "ap1",
});

export const Pusher = {
  sendMessage: (payload: IMessage) =>
    axios.post(`${Configs.application.backendURL}/message`, payload),
  subscribe: (channelId: string) => {
    try {
      return pusher.subscribe(channelId);
    } catch (ex) {
      console.log("PUSHER exception", ex);
      throw ex;
    }
  },
};
