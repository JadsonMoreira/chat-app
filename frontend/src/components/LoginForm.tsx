import { useState } from "react";
import Field from "./Field";
// import { getUsers } from "../utils/storage";
import s from "../utils/styles";
import { login } from "../services/authService";
import axios from "axios";

interface LoginFormProps {
  onLogin: (user: any) => void;
  onToast: (msg: string, type: "error" | "success" | "info") => void;
}

const LoginForm = ({ onLogin, onToast }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

    async function handleLogin() {
    try {
      setLoading(true);

      const e: Record<string, string> = {};
      if (!email || !pass) {
        if (!email) e.username = "Usuário obrigatório";
        if (!pass) e.password = "Senha obrigatória";
        setErrs(e);
        return;
      }

      const data = await login({
        username: email,
        password: pass,
      });

      onToast(data.message || "Login realizado com sucesso.", "success");
      setTimeout(() => onLogin(data), 900);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        onToast(apiMessage || "Falha ao fazer login.", "error");
      } else {
        const genericMessage = error instanceof Error ? error.message : "Falha ao fazer login.";
        onToast(genericMessage, "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Field
        label="Usuário"
        type="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          setErrs((prev) => ({ ...prev, username: "" }));
        }}
        placeholder="seu@email.com"
        error={errs.username}
        onEnter={handleLogin}
      />
      <Field
        label="Senha"
        type="password"
        value={pass}
        onChange={(v) => {
          setPass(v);
          setErrs((prev) => ({ ...prev, password: "" }));
        }}
        placeholder="••••••••"
        error={errs.password}
        onEnter={handleLogin}
      />
      <button onClick={handleLogin} disabled={loading} style={loading ? s.btnOff : s.btnPrimary}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div style={{ textAlign: "center", marginTop: 24, color: "#888", fontSize: 13 }}>
        Desenvolvido por Jadson Moreira
      </div>
    </div>
  );
}

export default LoginForm;
