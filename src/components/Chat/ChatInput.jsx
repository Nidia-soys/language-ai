import { useState } from "react";

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
        borderTop: "1px solid #2d3748",
        padding: 20,
        display: "flex",
        gap: 12,
      }}
    >
      <textarea
        rows={2}
        value={text}
        placeholder="Write something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          resize: "none",
          borderRadius: 12,
          padding: 14,
          fontSize: 16,
        }}
      />

      <button
        onClick={submit}
        style={{
          width: 90,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}