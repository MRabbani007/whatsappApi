import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function MissingPage() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-amber-800/10">
      <div className="flex items-center justify-between gap-4 p-4 ">
        <Link
          to={"/"}
          className="flex items-center gap-1 text-green-500 text-2xl py-2 px-4"
        >
          <FaWhatsapp size={35} />
          <span>Whatsapp</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center">
        <p>Page Not Found</p>
        <Link to={location?.state?.from ?? "/"}>Go Back</Link>
      </div>
    </div>
  );
}
