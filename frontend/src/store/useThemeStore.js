import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",

  setTheme: (newTheme) => {
    console.error(newTheme);
    // Set Local Storage then set theme
    localStorage.setItem("chat-theme", newTheme);
    set({ theme: newTheme });
  },
}));
