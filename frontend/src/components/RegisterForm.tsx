import { useState } from "react";
import Field from "./Field";
import s from "../utils/styles";
import { createUserService } from "../services/createUserService";
import axios from "axios";

interface RegisterFormProps {
  onRegister: () => void;
  onToast: (msg: string, type: "error" | "success" | "info") => void;
}

function RegisterForm({ onRegister, onToast }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);


  const submit = async () => {
    const e: Record<string, string> = {};
    if (!name) e.name = "Nome obrigatório";
    if (!email) e.email = "E-mail obrigatório";
    if (!pass) e.pass = "Senha obrigatória";
    if (pass !== conf) e.conf = "As senhas não coincidem";

    setErrs(e);
    if (Object.keys(e).length > 0) return;

    try {
      setLoading(true);

      const data = await createUserService({
        username: name,
        password: pass,
        email,
      });

      onToast(data.message || "Usuário criado com sucesso.", "success");
      setTimeout(() => onRegister(), 900);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        onToast(apiMessage || "Erro ao criar usuário.", "error");
      } else {
        onToast("Erro ao criar usuário.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <Field label="Nome" value={name} onChange={(v) => { setName(v); setErrs((p) => ({ ...p, name: "" })); }} placeholder="Seu nome completo" error={errs.name} />
      <Field label="E-mail" type="email" value={email} onChange={(v) => { setEmail(v); setErrs((p) => ({ ...p, email: "" })); }} placeholder="seu@email.com" error={errs.email} />
      <Field label="Senha" type="password" value={pass} onChange={(v) => { setPass(v); setErrs((p) => ({ ...p, pass: "" })); }} placeholder="Digite sua senha" error={errs.pass} />
      <Field label="Confirmar senha" type="password" value={conf} onChange={(v) => { setConf(v); setErrs((p) => ({ ...p, conf: "" })); }} placeholder="Repita a senha" error={errs.conf} />
      <button onClick={submit} disabled={loading} style={loading ? s.btnOff : s.btnPrimary}>
        {loading ? "Criando conta..." : "Criar conta"}
      </button>
    </div>
  );
}

export default RegisterForm;
