import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeModeProvider, useThemeModeContext } from "@/components/contexts/theme-mode-provider";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { DrizzleGate } from "@/hooks/drizzle-provider";
import { getContext, TanstackQueryProvider } from "@/components/contexts/tanstack-query-provider";

export const unstable_settings = {
    anchor: "(tabs)",
};
export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <TanstackQueryProvider queryClient={getContext().queryClient}>
                <ThemeModeProvider>
                    <ThemeProvider>
                        <DrizzleGate>
                            <Stack
                                screenOptions={{
                                    animation: "fade_from_bottom",
                                }}
                            >
                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            </Stack>
                            <StatusBar_ />
                        </DrizzleGate>
                    </ThemeProvider>
                </ThemeModeProvider>
            </TanstackQueryProvider>
        </SafeAreaProvider>
    );
}
function StatusBar_() {
    const { mode } = useThemeModeContext();

    return <StatusBar style={mode === "dark" ? "light" : "dark"} />;
}
