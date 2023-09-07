interface Common {
  id?: string;
  createdAt?: number;
}
export interface IMessage extends Common {
  text: string;
  sender: string;
  receiver: string;
  unRead: boolean;
  channelId: string;
}

export interface IUser extends Common {
  uid: string;
  email: string;
  displayName: string;
}

export interface IChannel extends Common {
  channelId: string;
  senderId: string;
  receiverId: string;
}

export interface IFirebaseToken extends Common {
  token: string;
  uId: string;
}
