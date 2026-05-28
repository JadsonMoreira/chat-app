import Avatar from "./Avatar";
import s from "../utils/styles";

interface ChatHeaderProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

function ChatHeader({ user, onLogout }: ChatHeaderProps) {
  return (
    <div style={s.header}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={s.logoBox}>💬</div>
        <div>
          <p style={{ fontWeight: 700, fontSize: "15px", color: "#f1f5f9", margin: 0 }}>Chat Geral</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: "11px", color: "#64748b" }}>online</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Avatar name={user.name} size={28} />
        <div style={{ lineHeight: 1.3 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0", margin: 0 }}>{user.name}</p>
          <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{user.email}</p>
        </div>
        <button onClick={onLogout} style={{ marginLeft: "6px", padding: "6px 12px", borderRadius: "10px", background: "#7f1d1d", border: "1px solid #ef4444", color: "#fee2e2", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 0 1px rgba(239,68,68,0.2) inset" }}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
