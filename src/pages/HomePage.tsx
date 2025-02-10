import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col ">
      <div className="flex items-center justify-between gap-4 p-4 ">
        <Link
          to={"/"}
          className="flex items-center gap-1 text-green-500 text-2xl py-2 px-4"
        >
          <FaWhatsapp size={35} />
          <span>Whatsapp</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 font-medium text-zinc-800">
        <div>Welcome to whatsapp web</div>
        <Link
          to={"/login"}
          className="text-sm py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-600 duration-200"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
