import { useState } from "react";

export default function Settings() {
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("OPENAI_KEY") || ""
  );

  function saveKey() {
    localStorage.setItem("OPENAI_KEY", apiKey);

    alert("API Key saved.");
  }

  return (
    <div
      style={{
        maxWidth: 700,
      }}
    >
      <h2>Settings</h2>

      <p>OpenAI API Key</p>

      <input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="sk-..."
        style={{
          width: "100%",
          padding: 14,
          marginTop: 10,
        }}
      />

      <button
        onClick={saveKey}
        style={{
          marginTop: 20,
          padding: "12px 22px",
        }}
      >
        Save
      </button>
    </div>
  );
}