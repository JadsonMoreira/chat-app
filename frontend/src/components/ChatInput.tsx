import { useState } from "react";
import s from "../utils/styles";

interface ChatInputProps {
  onSend: (text: string) => Promise<void> | void;
}

function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  async function send() {
    const t = text.trim();
    if (!t) return;
    await onSend(t);
    setText("");
  }


  return (
    <div style={s.inputRow}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Escreva uma mensagem..."
        style={{ ...s.input, borderColor: focused ? "#3b82f6" : "#2d3748" }}
      />
      <button onClick={send} disabled={!text.trim()} style={text.trim() ? s.sendBtn : s.sendBtnOff}>➤</button>
    </div>
  );
}

export default ChatInput;
