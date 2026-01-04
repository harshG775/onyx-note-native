import { db } from "@/lib/db/drizzle";
import migrations from "@/lib/db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { ThemedView } from "@/components/core/themed-view";
import { ThemedText } from "@/components/core/themed-text";
import { ActivityIndicator } from "react-native";

export function DrizzleGate({ children }: { children: React.ReactNode }) {
    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Migration error: {error.message}</ThemedText>
            </ThemedView>
        );
    }

    if (!success) {
        return (
            <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <ThemedText>Initializing database...</ThemedText>
            </ThemedView>
        );
    }

    return <>{children}</>;
}
