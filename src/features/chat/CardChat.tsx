import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import { IoIosSend } from "react-icons/io";

export default function CardChat({ chat }: { chat: Chat }) {
  const { handleOpenChat } = useContext(GlobalContext);

  return (
    <div className="flex items-center gap-4 hover:bg-zinc-400/10 duration-200">
      <div className="my-2 ml-4 w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-indigo-800 shadow-md shadow-zinc-400"></div>
      <div className="py-3 px-2 flex-1 flex border-b-[1px] border-zinc-500 pb-2">
        <div className="flex-1 ">
          <p>{chat.title}</p>
          <p className="text-xs">{chat.phoneNumber}</p>
        </div>
        <button
          onClick={() => handleOpenChat(chat)}
          className=" duration-200 rounded-full"
        >
          <IoIosSend size={20} />
        </button>
      </div>
    </div>
  );
}
