import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FormSendMessage from "../../features/chat/FormSendMessage";
import ChatsContainer from "../../features/chat/ChatsContainer";

export default function ChatPage() {
  const { activeChat, messages, ReceiveNotification } =
    useContext(GlobalContext);

  const chatMessages = Array.isArray(messages)
    ? messages.filter((item) => item.chatId === activeChat?.id)
    : [];

  useEffect(() => {}, [messages]);

  return (
    <main className="flex-1 flex items-stretch">
      <ChatsContainer />
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-zinc-800">
            {/* Chat title */}
            <div className="flex items-center gap-4 p-4 bg-cyan-950">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-indigo-800 shadow-md shadow-zinc-400"></div>
              <div>
                <p className="text-white">{activeChat?.title}</p>
                <p className="text-zinc-400 text-sm">
                  {activeChat?.phoneNumber}
                </p>
              </div>
            </div>
            {/* Chat Body */}
            <div className="flex-1 flex flex-col items-end justify-end p-2 gap-2 ">
              {chatMessages.map((item) => (
                <div
                  key={item.id}
                  className={
                    (item.senderId === "77052035486@c.us"
                      ? "bg-green-100 "
                      : " mr-auto bg-zinc-100") +
                    " py-1 px-2 text-sm  rounded-md"
                  }
                >
                  {item.message}
                </div>
              ))}
            </div>
            <div className="flex">
              <button
                onClick={ReceiveNotification}
                className="bg-zinc-200 rounded-md mx-auto text-sm py-2 px-4"
              >
                Receive
              </button>
            </div>
            {/* Buttons & Keyboard */}
            <FormSendMessage />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-emerald-950">
            <p className="text-lg text-zinc-200">WhatsApp Web</p>
            <p className="text-sm text-zinc-400">
              Send and receive messages without keeping your phone online.
            </p>
            <p className="text-sm text-zinc-400">
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
