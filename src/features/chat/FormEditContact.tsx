import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function FormEditContact({
  contact,
  showForm,
  setShowForm,
}: {
  contact: Contact;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleEditContact, handleDeleteContact } = useContext(GlobalContext);

  const [name, setName] = useState(contact?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber ?? "");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (name === "") {
      alert("Please add name");
      return null;
    }
    if (phoneNumber === "") {
      alert("Please provide number");
      return null;
    }

    handleEditContact({ id: contact.id, name, phoneNumber });
    setShowForm(false);
  };

  const handleReset = () => {
    setShowForm(false);
  };

  const handleDelete = () => {
    handleDeleteContact(contact);

    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          (showForm ? "" : "") +
          " shadow-md shadow-zinc-500 rounded-lg bg-zinc-100"
        }
      >
        <div className="py-2 px-4 flex items-center justify-between bg-green-700 text-white rounded-t-lg">
          <p>Update Contact</p>
          <button type="reset">x</button>
        </div>
        <div className="py-4 px-8 flex flex-col gap-4 ">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[1px] rounded-md border-green-700 py-1 px-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-[1px] rounded-md border-green-700 py-1 px-2"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="text-sm py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-600 duration-200"
            >
              Save
            </button>
            <button
              type="reset"
              className="text-sm py-2 px-4 bg-zinc-700 text-white rounded-md hover:bg-green-600 duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-sm py-2 px-4 bg-red-700 text-white rounded-md hover:bg-green-600 duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
