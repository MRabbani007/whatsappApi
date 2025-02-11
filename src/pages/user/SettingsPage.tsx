import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

export default function SettingsPage() {
  const { clearAll } = useContext(GlobalContext);

  return (
    <main className="flex-1 flex flex-col bg-gradient-to-br to-teal-950 from-zinc-900 p-4">
      <h1 className="text-zinc-200 mb-4">Settings</h1>
      <div className="flex">
        <button
          onClick={clearAll}
          className="mt-auto py-2 px-4 text-sm flex items-center justify-center text-white bg-red-700 hover:bg-red-600 duration-200 rounded-full"
        >
          Clear Content
        </button>
      </div>
    </main>
  );
}
