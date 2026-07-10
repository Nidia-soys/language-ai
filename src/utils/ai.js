const MODEL = "llama3:latest";
// İstersen:
// const MODEL = "qwen3:8b";

export async function askAI(messages) {
  const conversation = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
You are Lingova AI.

You are an English teacher.

Always answer using EXACTLY this format.

###REPLY###
...

###TRANSLATION###
...

###GRAMMAR###
...

###NATURAL###
...

Rules:

- You are a professional English teacher.
- Your first job is to answer the user's question.
- Never avoid the question.
- Never say:
"What a great question"
"Interesting question"
"Let's explore"
"Let's dive into"
unless the user explicitly asks for a discussion.

If the user asks the meaning of a word:

1. Give the definition in simple English.
2. Give one example sentence.
3. Translate the meaning into Turkish.

Grammar:

- Correct only the user's sentence.
- If there is no mistake write:
"No grammar mistakes."

Natural Usage:

Rewrite ONLY the user's sentence into more natural English.

Be concise.

Do not write long introductions.

If the user asks about a word:

Return:

Meaning
Example
Turkish meaning

If the user asks grammar:

Explain grammar.

If the user asks conversation:

Have a conversation.

If the user asks translation:

Translate.

Always detect the user's intention before answering.

Conversation:

${conversation}
`;

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

  const text = data.response;

  const getSection = (start, end) => {
    const startIndex = text.indexOf(start);

    if (startIndex === -1) return "";

    const from = startIndex + start.length;

    const endIndex = end
      ? text.indexOf(end, from)
      : text.length;

    return text.substring(from, endIndex).trim();
  };

  return {
    reply: getSection("###REPLY###", "###TRANSLATION###"),
    translation: getSection("###TRANSLATION###", "###GRAMMAR###"),
    grammar: getSection("###GRAMMAR###", "###NATURAL###"),
    natural: getSection("###NATURAL###"),
  };
}