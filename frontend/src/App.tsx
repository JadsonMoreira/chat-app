import { useEffect, useState } from "react";
import AuthPage from "./components/AuthPage";
import ChatPage from "./components/ChatPage";
import { getSession, saveSession, clearSession } from "./utils/storage";
import { connectSocket, disconnectSocket } from "./services/socket";
 
interface SessionUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

function normalizeSession(data: any): SessionUser | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.id || !data.name || !data.email || !data.accessToken) {
    return null;
  }

  return data as SessionUser;
}

export default function App() {
  const [realtimeTick, setRealtimeTick] = useState(0);
  const [user, setUser] = useState<SessionUser | null>(() => {
    const session = normalizeSession(getSession());

    if (!session) {
      clearSession();
      return null;
    }

    return session;
  });

  useEffect(() => {
    if (!user?.accessToken) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket(user.accessToken);

    const handleMessageNew = () => {
      setRealtimeTick((prev) => prev + 1);
    };

    socket.on("message:new", handleMessageNew);

    return () => {
      socket.off("message:new", handleMessageNew);
      disconnectSocket();
    };
  }, [user?.accessToken]);

  function handleAuth(u: any) { saveSession(u); setUser(u); }
  function handleLogout() { clearSession(); setUser(null); }
  return user ? <ChatPage user={user} onLogout={handleLogout} realtimeTick={realtimeTick} /> : <AuthPage onAuth={handleAuth} />;
}

