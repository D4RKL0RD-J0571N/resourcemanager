import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function DarkModeToggle() {
    const { isDark, toggleTheme } = useContext(ThemeContext)!;

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border border-gray-400 dark:border-gray-600"
        >
            {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}
