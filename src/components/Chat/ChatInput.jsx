import { useState } from "react";
import { Send, Mic } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
  
    onSend(text);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: 20,
        borderTop: "1px solid #334155",
      }}
    >
      <textarea
        rows={2}
        value={text}
        placeholder="Write your message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          minHeight:70,
          maxHeight:180,
          overflowY:"auto",
          flex: 1,
          resize: "none",
          borderRadius: 14,
          border: "1px solid #475569",
          background: "#0F172A",
          color: "#fff",
          padding: 14,
          fontSize: 15,
          outline: "none",
        }}
      />

<button
  style={{
    width: 60,
    border: "1px solid #334155",
    borderRadius: 14,
    background: "#1E293B",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Mic size={18} />
</button>

      <button
        onClick={submit}
        style={{
           width: 60,
           border: "none",
           borderRadius: 14,
           cursor: "pointer",
           background: "#7C3AED",
           color: "white",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
  }}
>
  <Send size={18} />
</button>
    </div>
  );
}