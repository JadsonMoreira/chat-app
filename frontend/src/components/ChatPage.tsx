import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { getMsgs, saveMsgs } from "../utils/storage";
import s from "../utils/styles";
import { getChatGlobal } from "../services/getChatGlobal";
import { sendMenssage } from "../services/sendMenssage";
import { getSocket } from "../services/socket";

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface ApiMessage {
  _id: string;
  senderId?: { _id?: string; name?: string } | string;
  content: string;
  createdAt: string;
}

interface ChatPageProps {
  user: { id: string; name: string; email: string };
  onLogout: () => void;
  realtimeTick: number;
}

function normalizeId(value: unknown): string {
  return String(value ?? "").trim();
}

function ChatPage({ user, onLogout }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(() => getMsgs());
  const [chatId, setChatId] = useState<string>("");

  async function loadChatGlobalMessages() {
    try {
      const response = await getChatGlobal();

      const apiMessages = (response?.messages || []) as ApiMessage[];

      const normalizedMessages: Message[] = apiMessages.map((item) => ({
        id: item._id,
        userId: normalizeId(
          typeof item.senderId === "object"
            ? item.senderId?._id
            : item.senderId
        ),
        userName:
          typeof item.senderId === "object"
            ? item.senderId?.name || "Usuário"
            : "Usuário",
        text: item.content,
        createdAt: item.createdAt,
      }));

      setChatId(response?.chat?._id || "");
      setMessages(normalizedMessages);
      saveMsgs(normalizedMessages);
    } catch (error) {
      console.error("Erro ao carregar chat global", error);
    }
  }

  async function handleSend(text: string) {
    if (!chatId) {
      console.error("Nenhum chat disponível para enviar mensagem.");
      return;
    }

    await sendMenssage(chatId, text);
  }

  useEffect(() => {
    const socket = getSocket();

    if (!socket) {
      return;
    }

    const handleMessageNew = (message: any) => {
      const newMessage: Message = {
        id: message._id,
        userId: normalizeId(
          typeof message.senderId === "object"
            ? message.senderId?._id
            : message.senderId
        ),
        userName:
          typeof message.senderId === "object"
            ? message.senderId?.name || "Usuário"
            : "Usuário",
        text: message.content,
        createdAt: message.createdAt,
      };

      setMessages((prev) => {
        const updated = [...prev, newMessage];
        saveMsgs(updated);
        return updated;
      });
    };

    socket.on("message:new", handleMessageNew);

    return () => {
      socket.off("message:new", handleMessageNew);
    };
  }, []);

  useEffect(() => {
    loadChatGlobalMessages();
  }, []);

  return (
    <div style={s.page}>
      <div style={s.chatWrap}>
        <ChatHeader user={user} onLogout={onLogout} />
        <ChatMessages
          messages={messages}
          userId={normalizeId(user.id)}
        />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatPage;