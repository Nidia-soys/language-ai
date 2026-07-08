import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

export default function Chat() {

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your AI language coach."
        }
    ]);

    function sendMessage(text){

        if(!text.trim()) return;

        const userMessage={
            role:"user",
            content:text
        };

        const botMessage={
            role:"assistant",
            content:`You said: ${text}`
        };

        setMessages(prev=>[
            ...prev,
            userMessage,
            botMessage
        ]);

    }

    return(

        <div className="flex flex-col h-full">

            <div className="flex-1 overflow-auto p-6">

                {messages.map((message,index)=>(
                    <ChatMessage
                        key={index}
                        message={message}
                    />
                ))}

            </div>

            <ChatInput
                onSend={sendMessage}
            />

        </div>

    )

}