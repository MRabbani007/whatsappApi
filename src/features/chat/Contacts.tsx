import { Dispatch, SetStateAction, useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FormAddNumber from "./FormAddNumber";
import { IoIosSend } from "react-icons/io";
import FormEditContact from "./FormEditContact";
import { IoArrowBack } from "react-icons/io5";

export default function Contacts({
  setShowContacts,
}: {
  setShowContacts: Dispatch<SetStateAction<boolean>>;
}) {
  const { contacts, handleCreateChat } = useContext(GlobalContext);

  const [showAddContact, setShowAddContact] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Contact | null>(null);

  return (
    <div className="absolute flex flex-col top-0 left-0 bottom-0 w-full z-10 bg-gradient-to-br from-sky-950 to-zinc-950">
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => setShowContacts(false)}>
          <IoArrowBack size={20} />
        </button>
        <p className="text-zinc-50">New Chat</p>
      </div>
      <div className="flex-1 flex flex-col text-sm font-medium text-zinc-800 p-2 gap-2 ">
        {Array.isArray(contacts) &&
          contacts.map((item, idx) => (
            <div
              key={item.name + idx}
              className="py-1 px-2 border-[1px] border-zinc-300 flex items-center gap-4 rounded-md bg-zinc-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-indigo-800 shadow-md shadow-zinc-400"></div>
              <div>
                <p
                  onClick={() => {
                    setEdit(true);
                    setEditItem(item);
                  }}
                >
                  {item.name}
                </p>
                <p className="text-xs">{item.phoneNumber}</p>
              </div>
              <button
                onClick={() => {
                  handleCreateChat(item);
                  setShowContacts(false);
                }}
                className="p-2 bg-zinc-300 hover:bg-white duration-200 rounded-full ml-auto"
              >
                <IoIosSend size={20} />
              </button>
            </div>
          ))}
        <button
          onClick={() => setShowAddContact(true)}
          className="py-1 text-sm flex items-center justify-center text-white bg-green-700 hover:bg-green-600 duration-200 rounded-full"
        >
          Add Contact
        </button>
      </div>
      {showAddContact && (
        <FormAddNumber
          showForm={showAddContact}
          setShowForm={setShowAddContact}
        />
      )}
      {edit && editItem && (
        <FormEditContact
          contact={editItem}
          setShowForm={setEdit}
          showForm={edit}
        />
      )}
    </div>
  );
}
