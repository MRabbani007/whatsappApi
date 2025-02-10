import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FormSendMessage from "../../features/chat/FormSendMessage";
import Navbar from "../../features/navigation/Navbar";
import Chats from "../../features/chat/Chats";

export default function ChatPage() {
  const { activeChat, messages, ReceiveNotification } =
    useContext(GlobalContext);

  const chatMessages = messages.filter(
    (item) => item.chatId === activeChat?.id
  );

  return (
    <main className="flex-1 flex items-stretch bg-zinc-800 p-4">
      <Navbar />
      <Chats />
      {/* <Contacts /> */}
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
            <div>
              <button onClick={ReceiveNotification}>Receive</button>
              <button>Delete</button>
            </div>
            {/* Buttons & Keyboard */}
            <FormSendMessage />
          </div>
        ) : null}
      </div>
    </main>
  );
}
