import Avatar from "./Avatar";
import { fmtTime } from "../utils/helpers";

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface ChatBubbleProps {
  msg: Message;
  isOwn: boolean;
  showMeta: boolean;
}

function ChatBubble({ msg, isOwn, showMeta }: ChatBubbleProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", justifyContent: isOwn ? "flex-end" : "flex-start", marginTop: showMeta ? "12px" : "2px" }}>
      {!isOwn && (
        <div style={{ width: "32px", flexShrink: 0 }}>
          {showMeta && <Avatar name={msg.userName} size={32} />}
        </div>
      )}
      <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: isOwn ? "flex-end" : "flex-start", gap: "3px" }}>
        {showMeta && !isOwn && <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, paddingLeft: "4px" }}>{msg.userName}</span>}
        <div style={{ background: isOwn ? "#1d4ed8" : "#374151", color: "#f1f5f9", padding: "9px 14px", borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: "14px", lineHeight: 1.5, wordBreak: "break-word" }}>
          {msg.text}
        </div>
        <span style={{ fontSize: "10px", color: "#4b5563", paddingLeft: "4px" }}>{fmtTime(msg.createdAt)}</span>
      </div>
      {isOwn && <div style={{ width: "32px", flexShrink: 0 }} />}
    </div>
  );
}

export default ChatBubble;
