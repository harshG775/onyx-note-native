import { ThemedText } from "@/components/core/themed-text";
import { ThemedTextInput } from "@/components/core/themed-text-input";
import { ThemedView } from "@/components/core/themed-view";
import Button from "@/components/ui/button";
import { db } from "@/lib/db/drizzle";
import { noteTable } from "@/lib/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TextInput } from "react-native";

export default function HomeTab() {
    const [text, setText] = useState("");

    const queryClient = useQueryClient();

    const { data: notes, refetch } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => db.select().from(noteTable),
    });

    const addMutation = useMutation({
        mutationFn: async ({ title, content }: { title: string; content: string }) => {
            return db.insert(noteTable).values({ title, content }).returning();
        },
        onSuccess(returnedData) {
            queryClient.setQueryData(["notes"], (oldData: any) => {
                return oldData ? [...oldData, ...returnedData] : returnedData;
            });
        },
    });
    const deleteMutation = useMutation({
        mutationFn: async () => await db.delete(noteTable),
        onSuccess: () => {
            queryClient.setQueryData(["notes"], []);
        },
    });

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
            {notes === null || notes?.length === 0 ? (
                <ThemedView>
                    <ThemedText>Empty</ThemedText>
                </ThemedView>
            ) : (
                notes?.map((item) => <ThemedText key={item.id}>{item.title}</ThemedText>)
            )}
            <ThemedView>
                <ThemedTextInput value={text} onChangeText={(newText) => setText(newText)} />
                <Button title="add" onPress={() => addMutation.mutate({ title: text, content: "description" })} />
            </ThemedView>
            <Button title="empty" onPress={() => deleteMutation.mutate()} />
        </ThemedView>
    );
}
