import { ThemedText } from "@/components/core/themed-text";
import { ThemedView } from "@/components/core/themed-view";
import { db } from "@/lib/db/drizzle";
import { noteTable } from "@/lib/db/schema";
import { useEffect, useState } from "react";

export default function HomeTab() {
    const [items, setItems] = useState<(typeof noteTable.$inferSelect)[] | null>(null);
    useEffect(() => {
        (async () => {
            await db.delete(noteTable);

            await db.insert(noteTable).values([
                {
                    title: "todo1",
                    content: "todo description",
                },
            ]);
            await db.insert(noteTable).values([
                {
                    title: "new todo",
                    content: "todo description",
                },
            ]);

            const users = await db.select().from(noteTable);
            setItems(users);
        })();
    }, []);


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
