import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/auth/LoginPage";
import MissingPage from "./pages/MissingPage";
import ContactsPage from "./pages/user/ContactsPage";
import ChatPage from "./pages/user/ChatPage";
import RequireAuth from "./features/auth/RequireAuth";
import Providers from "./context/Providers";
import SettingsPage from "./pages/user/SettingsPage";
import LayoutUser from "./layouts/LayoutUser";

export default function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<LayoutUser />}>
              <Route path="chat" element={<ChatPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Providers>
  );
}
