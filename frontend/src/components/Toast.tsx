import { useEffect } from "react";
import s from "../utils/styles";

interface ToastProps {
  msg: string;
  type: "error" | "success" | "info";
  onClose: () => void;
}

function Toast({ msg, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? "#b91c1c" : type === "success" ? "#065f46" : "#1e40af";
  return <div style={{ ...s.toast, background: bg }}>{msg}</div>;
}

export default Toast;
