import { useState } from "react";

export const useTheme = () => {
    
    const [theme, setTheme] = useState<string>('');
    const [activeTheme, setActiveTheme] = useState<Record<string, string>>({});
    const handleThemeChange = (th: string) => {
        setTheme(th);
        localStorage.setItem('theme', th);
    }
    return {
        handleThemeChange,
        theme,
        activeTheme,
        setActiveTheme
    }
}