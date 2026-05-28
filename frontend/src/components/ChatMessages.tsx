import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import DayDivider from "./DayDivider";
import { sameDay } from "../utils/helpers";
import s from "../utils/styles";

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface ChatMessagesProps {
  messages: Message[];
  userId: string;
}

function normalizeId(value: unknown): string {
  return String(value ?? "").trim();
}

function ChatMessages({ messages, userId }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const items: any[] = [];
  let lastDay: string | null = null;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    const day = m.createdAt.slice(0, 10);
    if (day !== lastDay) { items.push({ type: "day", date: m.createdAt, key: "d" + day }); lastDay = day; }
    const prev = i > 0 ? messages[i - 1] : null;
    const showMeta = !prev || prev.userId !== m.userId || !sameDay(prev.createdAt, m.createdAt);
    items.push({ type: "msg", m, isOwn: normalizeId(m.userId) === normalizeId(userId), showMeta, key: m.id });
  }



  return (
    <div style={s.msgArea}>
      {messages.length === 0 && (
        <div style={s.emptyBox}>
          <span style={{ fontSize: "36px" }}>💬</span>
          <span style={{ fontSize: "13px", color: "#64748b" }}>Nenhuma mensagem ainda. Seja o primeiro!</span>
        </div>
      )}
      {items.map((it) =>
        it.type === "day"
          ? <DayDivider key={it.key} date={it.date} />
          : <ChatBubble key={it.key} msg={it.m} isOwn={it.isOwn} showMeta={it.showMeta} />
      )}
      <div ref={endRef} />
    </div>
  );
}

export default ChatMessages;
