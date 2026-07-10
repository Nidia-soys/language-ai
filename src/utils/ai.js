const MODEL = "llama3:latest";

export async function askAI(messages) {

    const SYSTEM_PROMPT = `
You are an AI language teacher.

Rules:

- answer only in English
- maximum 3 sentences
- keep answers short
- after every answer write:

🇹🇷 Turkish Translation

then

✨ Grammar Feedback

then

💡 Natural Alternative

Never explain anything else.
`;

const prompt =
SYSTEM_PROMPT +
"\n\n" +
messages
.map(m => `${m.role}: ${m.content}`)
.join("\n");


  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Ollama Error");
  }

  const data = await response.json();

  
  return data.response;
}