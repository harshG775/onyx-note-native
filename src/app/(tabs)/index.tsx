import { useThemeContext } from "@/components/contexts/theme-provider";
import { ThemedText } from "@/components/core/themed-text";
import { ThemedTextInput } from "@/components/core/themed-text-input";
import { ThemedView } from "@/components/core/themed-view";
import Button from "@/components/ui/button";
import { db } from "@/lib/db/drizzle";
import { noteTable } from "@/lib/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export default function HomeTab() {
    const [text, setText] = useState("");
    const { colors, spacing, radius } = useThemeContext();
    const queryClient = useQueryClient();

    const { data: notes } = useQuery({
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
            setText("");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async () => await db.delete(noteTable),
        onSuccess: () => queryClient.setQueryData(["notes"], []),
    });

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <ThemedView style={[styles.header, { paddingHorizontal: spacing.lg }]}>
                <ThemedText style={styles.title}>Notes</ThemedText>
                <Button
                    title="Clear"
                    variant="outline" 
                    onPress={() => deleteMutation.mutate()}
                />
            </ThemedView>

            <ScrollView
                contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {!notes || notes.length === 0 ? (
                    <ThemedView style={styles.emptyState}>
                        <ThemedText style={{ color: colors.mutedForeground }}>No notes yet.</ThemedText>
                    </ThemedView>
                ) : (
                    notes.map((item) => (
                        <ThemedView
                            key={item.id}
                            style={[
                                styles.noteCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                    borderRadius: radius.md,
                                    padding: spacing.md,
                                    marginBottom: spacing.sm,
                                },
                            ]}
                        >
                            <ThemedText style={{ color: colors.foreground }}>{item.title}</ThemedText>
                        </ThemedView>
                    ))
                )}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: colors.background,
                        borderTopColor: colors.border,
                        padding: spacing.md,
                    },
                ]}
            >
                <ThemedTextInput
                    style={[
                        styles.input,
                        {
                            borderColor: colors.border,
                            borderRadius: radius.sm,
                            color: colors.foreground,
                            paddingHorizontal: spacing.sm,
                        },
                    ]}
                    placeholder="New note..."
                    placeholderTextColor={colors.mutedForeground}
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Add" onPress={() => text.trim() && addMutation.mutate({ title: text, content: "" })} />
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
    },
    noteCard: {
        borderWidth: 1,
    },
    emptyState: {
        alignItems: "center",
        marginTop: 100,
    },
    inputWrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        gap: 10,
        borderTopWidth: 1,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
    },
});
