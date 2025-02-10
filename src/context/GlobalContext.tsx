import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import AuthContext from "./AuthContext";

type InitialState = {
  contacts: Contact[];
  setContacts?: Dispatch<SetStateAction<Contact[]>>;
  handleAddContact: (contact: Contact) => void;
  handleEditContact: (contact: Contact) => void;
  handleDeleteContact: (contact: Contact) => void;
  clearAllContacts: () => void;
  chats: Chat[];
  ReceiveNotification: () => void;
  activeChat?: Chat | null;
  handleOpenChat: (chat: Chat) => void;
  handleCreateChat: (contact: Contact) => void;
  handleSendMessage: (text: string) => void;
  messages: Message[];
};

const initialState: InitialState = {
  contacts: [],
  handleAddContact: () => {},
  handleEditContact: () => {},
  handleDeleteContact: () => {},
  clearAllContacts: () => {},
  chats: [],
  ReceiveNotification: () => {},
  activeChat: null,
  handleCreateChat: () => {},
  handleOpenChat: () => {},
  handleSendMessage: () => {},
  messages: [],
};

export const GlobalContext = createContext(initialState);

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const { auth } = useContext(AuthContext);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const [contacts, handleContacts] = useLocalStorage<Contact[]>("contacts", []);
  const [chats, handleChats] = useLocalStorage<Chat[]>("chats", []);
  const [messages, handleMessages] = useLocalStorage("messages", []);

  const handleAddContact = (contact: Contact) => {
    if (Array.isArray(contacts)) {
      const index = contacts.findIndex(
        (item) => item.phoneNumber === contact.phoneNumber
      );

      if (index >= 0) {
        const temp = [...contacts];
        // temp.splice(index, 1);
        handleContacts([contact, ...temp]);
      } else {
        handleContacts([contact, ...contacts]);
      }
    } else {
      handleContacts([contact]);
    }
  };

  const handleEditContact = (contact: Contact) => {
    if (Array.isArray(contacts)) {
      const index = contacts.findIndex(
        (item) => item.phoneNumber === contact.phoneNumber
      );

      if (index >= 0) {
        const temp = [...contacts];
        temp.splice(index, 1);
        handleContacts(temp);
      }
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    if (Array.isArray(contacts)) {
      const index = contacts.findIndex(
        (item) => item.phoneNumber === contact.phoneNumber
      );

      if (index >= 0) {
        const temp = [...contacts];
        temp.splice(index, 1);
        handleContacts(temp);
      }
    }
  };

  const clearAllContacts = () => {
    if (confirm("Are you sure you want to delete all contacts?")) {
      handleContacts([]);
      handleChats([]);
      handleMessages([]);
    }
  };

  const handleCreateChat = (contact: Contact) => {
    const index = Array.isArray(chats)
      ? (chats as Chat[]).findIndex(
          (item) =>
            item.type === "single" &&
            item.members.find((member) => member.id === contact?.id)
        )
      : -1;
    if (index >= 0) {
      const updatedChat = {
        ...chats[index],
        id: `${contact?.phoneNumber}@c.us`,
      };
      const temp = [...chats];
      temp.splice(index, 1, updatedChat);
      handleChats(temp);
      handleOpenChat(updatedChat);
    } else {
      const id = `${contact.phoneNumber}@c.us`;

      handleChats([
        ...(Array.isArray(chats) ? (chats as Chat[]) : []),
        {
          id,
          type: "single",
          title: contact.name,
          phoneNumber: contact.phoneNumber,
          members: [contact],
        },
      ]);

      handleOpenChat({
        id,
        type: "single",
        title: contact.name,
        phoneNumber: contact.phoneNumber,
        members: [contact],
      });
    }
  };

  const handleOpenChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  const handleSendMessage = async (message: string) => {
    try {
      const url = `https://7103.api.greenapi.com/waInstance${auth?.idInstance}/sendMessage/${auth?.apiTokenInstance}`;

      const chatId = `${activeChat?.phoneNumber}@c.us`;

      const response = await axios({
        url,
        method: "POST",
        data: { chatId, message },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // const temp = Array.isArray(messages) ? messages : [];
    // handleMessages([
    //   ...temp,
    //   {
    //     id: response?.data?.idMessage,
    //     message,
    //     senderId: "77052035486@c.us",
    //     chatId: activeChat?.id,
    //   },
    // ]);
  };

  const ReceiveNotification = async () => {
    const url = `https://7103.api.greenapi.com/waInstance${auth?.idInstance}/receiveNotification/${auth?.apiTokenInstance}`;

    const receiveTimeout = 5; // seconds

    const response = await axios({
      url,
      method: "GET",
      params: { receiveTimeout },
    });

    const messageData: MessageData = response?.data?.body?.messageData;
    const senderData: SenderData = response?.data?.body?.senderData;

    if (messageData && senderData) {
      const temp = Array.isArray(messages) ? messages : [];
      handleMessages([
        ...temp,
        {
          id: response?.data?.idMessage,
          message:
            messageData?.extendedTextMessageData?.text ??
            messageData?.textMessageData?.textMessage,
          senderId: senderData.sender,
          chatId: senderData?.chatId,
        },
      ]);
    }

    const receiptId = response?.data?.receiptId;

    if (receiptId) {
      await DeleteNotification(receiptId);
    }
  };

  const DeleteNotification = async (receiptId: number) => {
    const url = `https://7103.api.greenapi.com/waInstance${auth?.idInstance}/deleteNotification/${auth?.apiTokenInstance}/${receiptId}`;

    const response = await axios({
      url,
      method: "DELETE",
    });

    console.log(response.data);
  };

  useEffect(() => {
    if (auth?.idInstance) {
      ReceiveNotification();
    }
  }, [auth, activeChat]);

  return (
    <GlobalContext.Provider
      value={{
        contacts,
        handleAddContact,
        handleEditContact,
        handleDeleteContact,
        clearAllContacts,
        ReceiveNotification,
        chats,
        activeChat,
        handleCreateChat,
        handleOpenChat,
        handleSendMessage,
        messages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
