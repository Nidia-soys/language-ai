import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { askAI } from "../../utils/ai";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hello! 👋 I'm your AI language coach. How can I help you today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  async function handleSend(text) {
    if (!text.trim()) return;
  
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
  
    const updatedMessages = [...messages, userMessage];
  
    setMessages(updatedMessages);
  
    setIsTyping(true);
  
    try {
      const answer = await askAI(updatedMessages);
  
      setMessages([
        ...updatedMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer.reply,
          translation: answer.translation,
          grammar: answer.grammar,
          natural: answer.natural,
        },
      ]);
    } catch (err) {
      console.error(err);
  
      setMessages([
        ...updatedMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "❌ AI bağlantısı kurulamadı.",
        },
      ]);
    }
  
    setIsTyping(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 24,
        }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {isTyping && (
          <p
            style={{
              color: "#888",
              fontStyle: "italic",
            }}
          >
            AI is typing...
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}