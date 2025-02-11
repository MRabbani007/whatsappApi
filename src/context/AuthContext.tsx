import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthState = {
  auth: AuthenticatedUser | null;
  credentials: AuthenticatedUser | null;
  setAuth: Dispatch<SetStateAction<AuthenticatedUser | null>>;
  handleLogin: (
    idInstance: string,
    apiTokenInstance: string,
    remember: boolean
  ) => void;
  handleLogout: () => void;
};

const initialState: AuthState = {
  auth: null,
  credentials: null,
  setAuth: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthenticatedUser | null>(null);

  const [credentials, handleCredentials] = useLocalStorage("creds", {});

  const handleLogin = async (
    idInstance: string,
    apiTokenInstance: string,
    remember: boolean
  ) => {
    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      console.log("Provide credentials");
      return null;
    }

    try {
      const url = `https://7103.api.greenapi.com/waInstance${idInstance}/getWaSettings/${apiTokenInstance}`;

      const response: SettingsResponse = await axios({ url, method: "GET" });

      if (response?.data?.stateInstance === "authorized") {
        const { phone, deviceId, avatar } = response?.data;
        if (remember) {
          handleCredentials({
            idInstance,
            apiTokenInstance,
            phone,
            deviceId,
            avatar,
          });
        }

        setAuth({
          idInstance,
          apiTokenInstance,
          phone,
          deviceId,
          avatar,
        });
      } else {
        console.log("Login failed");
        console.log(response);
      }
    } catch (error) {
      console.log("Login Error");
    }
  };

  const handleLogout = () => {
    handleCredentials({});

    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{ auth, credentials, setAuth, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
