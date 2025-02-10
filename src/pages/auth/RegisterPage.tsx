import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <form
        action=""
        className="py-8 px-8 shadow-md shadow-zinc-500 flex flex-col gap-4 rounded-lg"
      >
        <h1 className="text-3xl font-light">Register</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border-[1px] rounded-md border-green-700"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-[1px] rounded-md border-green-700"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            className="border-[1px] rounded-md border-green-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit">Register</button>
          <span>or</span>
          <Link to={"/register"}>Sign In</Link>
        </div>
      </form>
    </main>
  );
}
