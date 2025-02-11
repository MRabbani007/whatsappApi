import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaWhatsapp } from "react-icons/fa";

export default function LoginPage() {
  const { auth, credentials, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.idInstance && auth?.apiTokenInstance) {
      navigate("/chat");
    }
  }, [auth]);

  const [idInstance, setIdInstance] = useState(credentials?.idInstance ?? "");
  const [apiTokenInstance, setPassword] = useState(
    credentials?.apiTokenInstance ?? ""
  );

  const [remember, setRemember] = useState(true);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleLogin(idInstance, apiTokenInstance, remember);

    navigate("/chat");
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex items-center justify-between gap-4 p-4 ">
        <Link
          to={"/"}
          className="flex items-center gap-1 text-green-500 text-2xl py-2 px-4"
        >
          <FaWhatsapp size={35} />
          <span>Whatsapp</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="py-8 px-8 shadow-md shadow-zinc-500 bg-zinc-100 flex flex-col gap-4 rounded-lg"
        >
          <h1 className="text-3xl font-light">Sign In</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">
              User Name
            </label>
            <input
              type="text"
              id="idInstance"
              name="idInstance"
              value={idInstance}
              placeholder="Enter your IdInstance"
              onChange={(e) => setIdInstance(e.target.value)}
              className="border-[1px] rounded-md border-green-700 py-1 px-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="apiTokenInstance" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="apiTokenInstance"
              name="apiTokenInstance"
              value={apiTokenInstance}
              placeholder="Enter your Api token"
              onChange={(e) => setPassword(e.target.value)}
              className="border-[1px] rounded-md border-green-700 py-1 px-2"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="text-sm py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-600 duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
