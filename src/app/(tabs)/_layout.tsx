import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";

export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <IconSymbol name="house.fill" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => <IconSymbol name="gearshape" size={size} color={color} />,
                    headerShown: true,
                }}
            />
        </Tabs>
    );
}
