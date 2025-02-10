import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MissingPage from "./pages/MissingPage";
import ContactsPage from "./pages/user/ContactsPage";
import ChatPage from "./pages/user/ChatPage";
import RequireAuth from "./features/auth/RequireAuth";
import Providers from "./context/Providers";

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Providers>
  );
}
