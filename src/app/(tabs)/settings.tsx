import { useThemeModeContext } from "@/components/contexts/theme-mode-provider";
import { ThemedText } from "@/components/core/themed-text";
import { ThemedView } from "@/components/core/themed-view";
import Button from "@/components/ui/button";

export default function SettingsTab() {
    const { mode, setMode } = useThemeModeContext();

    return (
        <ThemedView style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 12 }}>
            <Button
                onPress={() => {
                    setMode(mode === "light" ? "dark" : "light");
                }}
                title={mode === "light" ? "Dark" : "Light"}
                icon={mode === "light" ? "dark-mode" : "light-mode"}
                style={{
                    justifyContent: "flex-start",
                }}
            />

            <ThemedText style={{ marginTop: 40 }}>Current mode: {mode}</ThemedText>
        </ThemedView>
    );
}
