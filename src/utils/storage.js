const DEFAULT_DATA = {
    settings: {
      nativeLanguage: "Türkçe",
      targetLanguage: "English",
      level: "A1",
      dailyGoal: 20,
      apiKey: "",
      theme: "dark",
    },
  
    chats: [],
  
    favorites: [],
  
    wordLists: [],
  
    statistics: {
      learned: 0,
      reviewed: 0,
      streak: 0,
    },
  
    badges: [],
  };
  
  const STORAGE_KEY = "lingova-data";
  
  export async function loadStorage() {
    if (window.storage?.get) {
      const data = await window.storage.get(STORAGE_KEY);
  
      return data || DEFAULT_DATA;
    }
  
    const local = localStorage.getItem(STORAGE_KEY);
  
    if (!local) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DEFAULT_DATA)
      );
  
      return DEFAULT_DATA;
    }
  
    return JSON.parse(local);
  }
  
  export async function saveStorage(data) {
    if (window.storage?.set) {
      await window.storage.set(STORAGE_KEY, data);
      return;
    }
  
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }