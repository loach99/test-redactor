import { useEffect, useState } from "react";
export const useTheme = () => {
    const [theme, setTheme] = useState<string>('vs');
    const [activeTheme, setActiveTheme] = useState<Record<string, string>>({});
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    const handleThemeChange = (th: string) => {
        setTheme(th);
    }
    return {
        handleThemeChange,
        theme,
        activeTheme,
        setActiveTheme,
    }
}