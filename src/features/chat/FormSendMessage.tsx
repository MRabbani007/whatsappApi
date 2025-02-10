import { FormEvent, useContext, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { GlobalContext } from "../../context/GlobalContext";

export default function FormSendMessage() {
  const { handleSendMessage } = useContext(GlobalContext);

  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleSendMessage(text);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-zinc-950"
    >
      {/* <span className="text-white text-sm">Message</span> */}
      <input
        type="text"
        id="text"
        name="text"
        placeholder="Type a Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-[1px] border-zinc-400 bg-white py-1 px-2 flex-1 rounded-md"
      />
      <button title="Send" className="text-white hover:scale-110 duration-200">
        <IoIosSend size={20} />
      </button>
    </form>
  );
}
