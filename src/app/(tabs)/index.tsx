import { ThemedText } from "@/components/core/themed-text";
import { ThemedView } from "@/components/core/themed-view";
import { db } from "@/lib/db/drizzle";
import migrations from "@/lib/db/migrations/migrations";
import { noteTable } from "@/lib/db/schema";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect, useState } from "react";

export default function HomeTab() {
    const { success, error } = useMigrations(db, migrations);
    const [items, setItems] = useState<(typeof noteTable.$inferSelect)[] | null>(null);

    useEffect(() => {
        if (!success) return;

        (async () => {
            await db.delete(noteTable);

            await db.insert(noteTable).values([
                {
                    title: "todo name",
                    content: "todo description",
                },
            ]);

            const users = await db.select().from(noteTable);
            setItems(users);
        })();
    }, [success]);

    if (error) {
        return (
            <ThemedView>
                <ThemedText>Migration error: {error.message}</ThemedText>
            </ThemedView>
        );
    }

    if (!success) {
        return (
            <ThemedView>
                <ThemedText>Migration is in progress...</ThemedText>
            </ThemedView>
        );
    }

    if (items === null || items.length === 0) {
        return (
            <ThemedView>
                <ThemedText>Empty</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                justifyContent: "center",
            }}
        >
            {items.map((item) => (
                <ThemedText key={item.id}>{item.title}</ThemedText>
            ))}
        </ThemedView>
    );
}
