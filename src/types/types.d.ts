declare global {
  type AuthenticatedUser = {
    user?: string | null;
    accessToken?: string | null;
    roles?: number[];
    idInstance?: string | null;
    apiTokenInstance?: string | null;
    phone?: string;
    deviceId?: string;
    avatar?: string;
  };

  type User = {
    id: string;
    username: string;
    phoneNumber: string;
    profilePic?: string;
  };

  type Contact = {
    id: string;
    name: string;
    phoneNumber: string;
    profilePic?: string;
  };

  type Chat = {
    id: string;
    type: string; // "single" | "group"
    title: string;
    phoneNumber?: string;
    members: Contact[];
    messages?: Message[];
  };

  type Message = {
    id: string;
    chatId: string;
    senderId: string;
    message: string;
  };

  type TextMessage = {
    senderId: string;
    chatId: string;
    text: string;
    sendDate: Date;
    receiveDate: Date;
    readDate: Date;
  };

  type SenderData = {
    chatId: string;
    chatName: string;
    sender: string;
    senderContactName: string;
    senderName: string;
  };

  type MessageData = {
    extendedTextMessageData: {
      description: string;
      forwardingScore: number;
      isForwarded: boolean;
      jpegThumbnail: string;
      previewType: string;
      text: string;
      title: string;
    };
    textMessageData: {
      textMessage: string;
    };
  };

  type SettingsResponse = {
    data?: {
      avatar: string;
      phone: string;
      stateInstance: string;
      deviceId: string;
    };
  };
}

export {};
