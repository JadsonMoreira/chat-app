import { useState } from "react";
import Toast from "./Toast";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import s from "../utils/styles";

interface AuthPageProps {
  onAuth: (user: any) => void;
}

function AuthPage({ onAuth }: AuthPageProps) {
  const [tab, setTab] = useState("login");
  const [toast, setToast] = useState<{ msg: string; type: "error" | "success" | "info" } | null>(null);

  return (
    <div style={s.page}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div style={s.authWrap}>
        <div style={s.card}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <div style={{ ...s.logoBox, width: "48px", height: "48px", borderRadius: "14px", fontSize: "24px" }}>💬</div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, fontSize: "20px", color: "#f1f5f9", margin: 0 }}>Chat Geral</p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0" }}>Conecte-se e converse em tempo real</p>
            </div>
          </div>
          <div style={s.tabWrap}>
            {["login", "register"].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ ...s.tab, ...(tab === t ? s.tabOn : s.tabOff) }}>
                {t === "login" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>
          {tab === "login"
            ? <LoginForm onLogin={onAuth} onToast={(m, t) => setToast({ msg: m, type: t })} />
            : <RegisterForm onRegister={() => setTab("login")} onToast={(m, t) => setToast({ msg: m, type: t })} />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
