import { useEffect, useMemo, useState } from "react";
import Chat from "./components/Chat/Chat";
import { loadStorage, saveStorage } from "./utils/storage";
import SettingsPage from "./components/Settings/Settings";

import {
  Home,
  MessageCircle,
  BookOpen,
  Settings,
  Star,
  Mic,
  PenSquare,
  Layers3,
  Moon,
  Sun,
} from "lucide-react";

export default function App() {
  const [toast, setToast] = useState(null);

  const [appData, setAppData] = useState(null);
  useEffect(() => {
    async function init() {
      const data = await loadStorage();
      setAppData(data);
    }
  
    init();
  }, []);

  useEffect(() => {
    if (!appData) return;
  
    saveStorage(appData);
  }, [appData]);

const showToast = (message) => {
  setToast(message);

  setTimeout(() => {
    setToast(null);
  }, 2500);
};
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("dashboard");
  const [stats] = useState ({
    goal: 20,
    learned: 0,
    streak: 0,
    favorites: 0,
  });

  const colors = useMemo(() => {
    return theme === "dark"
      ? {
          bg: "#0F172A",
          surface: "#1E293B",
          sidebar: "#111827",
          border: "#334155",
          text: "#F8FAFC",
          secondary: "#94A3B8",
          primary: "#7C3AED",
        }
      : {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          sidebar: "#FFFFFF",
          border: "#E5E7EB",
          text: "#111827",
          secondary: "#6B7280",
          primary: "#7C3AED",
        };
  }, [theme]);

  useEffect(() => {
    document.body.style.background = colors.bg;
    document.body.style.color = colors.text;
  }, [colors]);

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
    },
  
    {
      id: "chat",
      title: "chat",
      icon: MessageCircle,
    },
  
    {
      id: "words",
      title: "words",
      icon: BookOpen,
    },
  
    {
      id: "flashcards",
      title: "flashcards",
      icon: Layers3,
    },
  
    {
      id: "writing",
      title: "writing",
      icon: PenSquare,
    },
  
    {
      id: "speaking",
      title: "speaking",
      icon: Mic,
    },
  
    {
      id: "favorites",
      title: "favorites",
      icon: Star,
    },
  
    {
      id: "settings",
      title: "settings",
      icon: Settings,
    },
  ];

  const activePage = menuItems.find((m) => m.id === page);

  const ActiveIcon = activePage?.icon;
  const ActiveTitle = activePage?.title;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <h2
          style={{
            fontWeight: 700,
          }}
        >
          🌍 Lingova AI
        </h2>

        <button
          onClick={() => {
            const nextTheme = theme === "dark" ? "light" : "dark";
            setTheme(nextTheme);
          
            showToast(
              nextTheme === "dark"
                ? "🌙 "
                : "☀️ "
            );
          }}
        >
          {
theme==="light"
?
<Sun size={18}/>
:
<Moon size={18}/>
}
        </button>
      </header>

      {/* BODY */}

      <div
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        {/* SIDEBAR */}

        <aside
          style={{
            width: 240,
            padding: 20,
            borderRight: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {menuItems.map((item) => {

const Icon = item.icon;

return (

  <button
    key={item.id}
    onClick={() => setPage(item.id)}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      border: "none",
      cursor: "pointer",
      padding: "14px 16px",
      borderRadius: 12,
      background:
        page === item.id
          ? colors.primary
          : "transparent",
      color: page === item.id ? "#fff" : colors.text,
      transition: ".25s",
      textAlign: "left",
    }}
  >

    <Icon size={18} />

    <span>{item.title}</span>

  </button>

);

})}
</aside>
        {/* CONTENT */}

        <main
          style={{
            flex: 1,
            padding: 50,
          }}
        >
          <h1
            
            style={{
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ActiveIcon size={28} />
          
            {activePage.title}

          </h1>

          <p
            style={{
              color: colors.secondary,
              marginBottom: 30,
              fontSize: 18,
            }}
          >
             Welcome to your AI-powered personal language coach.
          </p>

          {page === "dashboard" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: 20,
    }}
  >
    <Card
      colors={colors}
      title="🎯 Daily Goal"
      value={`${stats.learned} / ${stats.goal}`}
    />

    <Card
      colors={colors}
      title="🔥 Streak"
      value={`${stats.streak} Gün`}
    />

    <Card
      colors={colors}
      title="⭐ Favorites"
      value={stats.favorites}
    />

    <Card
      colors={colors}
      title="🏆 Medal"
      value="No medal yet"
    />
  </div>
)}

{page === "settings" && (
  <SettingsPage />
)}

{page === "chat" && (
  <div
    style={{
      height: "calc(100vh - 220px)",
      border: `1px solid ${colors.border}`,
      borderRadius: 18,
      overflow: "hidden",
      background: colors.surface,
    }}
  >
    <Chat />
  </div>
)}

        </main>
        
      </div>

      {toast && (
  <div
    style={{
      position: "fixed",
      bottom: 25,
      right: 25,
      background: colors.primary,
      color: "white",
      padding: "14px 20px",
      borderRadius: 12,
      boxShadow: "0 10px 25px rgba(0,0,0,.25)",
      animation: "fadeIn .2s",
      zIndex: 999,
    }}
  >
    {toast}
  </div>
)}
    </div>
  );
}

function Card({ title, value, colors }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 18,
        padding: 24,
      }}
    >
      <h3
        style={{
          marginBottom: 15,
        }}
      >
        {title}
      </h3>

      <h2>{value}</h2>

    </div>
  );
}