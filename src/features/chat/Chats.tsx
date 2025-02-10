import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiChatNewFill } from "react-icons/ri";
import Contacts from "./Contacts";

export default function Chats() {
  const { chats, handleOpenChat } = useContext(GlobalContext);

  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="flex flex-col w-[400px] bg-zinc-900 text-zinc-400 relative">
      <div className="flex items-center gap-4 py-4 px-4 ">
        <p className="mr-auto text-2xl text-zinc-50">Chats</p>
        <button onClick={() => setShowContacts(true)}>
          <RiChatNewFill size={20} />
        </button>
        <button>
          <PiDotsThreeOutlineVerticalFill size={20} />
        </button>
      </div>
      <div className="flex flex-col">
        {Array.isArray(chats) &&
          chats.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 hover:bg-zinc-400/10 duration-200"
            >
              <div className="my-2 ml-4 w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-indigo-800 shadow-md shadow-zinc-400"></div>
              <div className="py-3 px-2 flex-1 flex border-b-[1px] border-zinc-500 pb-2">
                <div className="flex-1 ">
                  <p>{item.title}</p>
                  <p className="text-xs">{item.phoneNumber}</p>
                </div>
                <button
                  onClick={() => handleOpenChat(item)}
                  className=" duration-200 rounded-full"
                >
                  <IoIosSend size={20} />
                </button>
              </div>
            </div>
          ))}
      </div>
      {showContacts && <Contacts setShowContacts={setShowContacts} />}
    </div>
  );
}
