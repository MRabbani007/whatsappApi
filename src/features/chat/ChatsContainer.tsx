import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiChatNewFill } from "react-icons/ri";
import Contacts from "./Contacts";
import CardChat from "./CardChat";

export default function ChatsContainer() {
  const { chats } = useContext(GlobalContext);

  const [showContacts, setShowContacts] = useState(false);

  const chatsContent = Array.isArray(chats) ? (
    chats.length === 0 ? (
      <div className="text-sm p-2 space-y-2">
        <p>You don't have any chats, start messaging now</p>
        <button
          className="text-blue-500 hover:text-blue-400 duration-200"
          onClick={() => setShowContacts(true)}
        >
          Go to Contacts
        </button>
      </div>
    ) : (
      chats.map((item) => <CardChat chat={item} key={item.id} />)
    )
  ) : null;

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
      <div className="flex flex-col">{chatsContent}</div>
      {showContacts && <Contacts setShowContacts={setShowContacts} />}
    </div>
  );
}
