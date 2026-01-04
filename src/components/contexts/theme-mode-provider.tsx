// theme-mode-provider.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextType = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

type ThemeProviderProps = {
    children: React.ReactNode;
};

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_MODE_KEY = "theme-mode";

export function ThemeModeProvider({ children }: ThemeProviderProps) {
    const systemMode = useColorScheme() ?? "light";
    const [mode, setModeState] = useState<ThemeMode>(systemMode);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(THEME_MODE_KEY);
                if (stored === "light" || stored === "dark") {
                    setModeState(stored);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setHydrated(true);
            }
        })();
    }, []);
    const setMode = async (next: ThemeMode) => {
        setModeState(next);
        await AsyncStorage.setItem(THEME_MODE_KEY, next);
    };
    if (!hydrated) return null;

    return <ThemeModeContext.Provider value={{ mode, setMode }}>{children}</ThemeModeContext.Provider>;
}

export function useThemeModeContext() {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) {
        throw new Error("useThemeModeContext must be used inside ThemeModeProvider");
    }
    return ctx;
}
