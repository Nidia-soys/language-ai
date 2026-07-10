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

        {message.translation && (
  <div
    style={{
      marginTop: 18,
      paddingTop: 12,
      borderTop: "1px solid rgba(255,255,255,.08)",
    }}
  >
    <div
      style={{
        color: "#A78BFA",
        fontWeight: 700,
        marginBottom: 6,
      }}
    >
      🇹🇷 Türkçe
    </div>

    <div>{message.translation}</div>
  </div>
)}

{message.grammar && (
  <div
    style={{
      marginTop: 16,
    }}
  >
    <div
      style={{
        color: "#60A5FA",
        fontWeight: 700,
        marginBottom: 6,
      }}
    >
      ✍️ Grammar
    </div>

    <div>{message.grammar}</div>
  </div>
)}

{message.natural && (
  <div
    style={{
      marginTop: 16,
    }}
  >
    <div
      style={{
        color: "#34D399",
        fontWeight: 700,
        marginBottom: 6,
      }}
    >
      💡 Natural Usage
    </div>

    <div>{message.natural}</div>
  </div>
)}
      </div>
    </div>
  );
}