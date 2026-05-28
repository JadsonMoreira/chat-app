import { useState } from "react";
import s from "../utils/styles";

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  error?: string;
  onEnter?: () => void;
}

function Field({ label, type = "text", value, onChange, placeholder, error, onEnter }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={s.label}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...s.fieldInput, borderColor: error ? "#ef4444" : focused ? "#3b82f6" : "#374151" }}
      />
      {error && <span style={s.errMsg}>{error}</span>}
    </div>
  );
}

export default Field;
