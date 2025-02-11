import { Link } from "react-router-dom";
import { FaBullhorn, FaUserCircle } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { HiStatusOnline } from "react-icons/hi";
import { MdGroups2, MdOutlineSettingsInputAntenna } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="flex flex-col items-center justify-between gap-4 p-4 bg-cyan-950 text-zinc-400">
      <div className="flex flex-col gap-3">
        <Link to={"/chat"} className="p-2 rounded-full hover:bg-zinc-500/30">
          <LuMessageSquareText size={25} />
        </Link>
        <Link to={"/status"} className="p-2 rounded-full hover:bg-zinc-500/30">
          <HiStatusOnline size={25} />
        </Link>
        <Link
          to={"/channels"}
          className="p-2 rounded-full hover:bg-zinc-500/30"
        >
          <MdOutlineSettingsInputAntenna size={25} />
        </Link>
        <Link
          to={"/channels"}
          className="p-2 rounded-full hover:bg-zinc-500/30"
        >
          <MdGroups2 size={25} />
        </Link>
        <div className="h-0.5 rounded-md w-full bg-zinc-400"></div>
        <Link
          to={"/buisnessTools"}
          className="p-2 rounded-full hover:bg-zinc-500/30"
        >
          <FaShop size={25} />
        </Link>
        <Link
          to={"/channels"}
          className="p-2 rounded-full hover:bg-zinc-500/30"
        >
          <FaBullhorn size={25} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          to={"/settings"}
          className="p-2 rounded-full hover:bg-zinc-500/30"
        >
          <IoSettingsOutline size={25} />
        </Link>
        <Link to={"/profile"} className="p-2 rounded-full hover:bg-zinc-500/30">
          <FaUserCircle size={25} />
        </Link>
      </div>
      {/* {auth?.idInstance ? (
        <div className="flex items-center gap-2">
          <span>{auth?.idInstance}</span>
          <button onClick={handleLogout}>
            <IoMdLogOut size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to={"/login"}>Sign In</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )} */}
    </nav>
  );
}
