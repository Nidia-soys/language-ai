export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: "14px 18px",
          borderRadius: 18,
          background: isUser ? "#7C3AED" : "#1E293B",
          color: "#fff",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          boxShadow: "0 6px 18px rgba(0,0,0,.15)",
        }}
      >
        {/* Sadece AI mesajlarında görünecek */}
        {!isUser && (
          <div
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            🤖 Lingova AI
          </div>
        )}

        {message.content}
      </div>
    </div>
  );
}