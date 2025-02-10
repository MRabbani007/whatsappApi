import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import GlobalProvider from "./GlobalContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <GlobalProvider>{children}</GlobalProvider>
    </AuthProvider>
  );
}
