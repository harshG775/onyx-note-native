import { View, type ViewProps } from "react-native";
import { useThemeContext } from "../contexts/theme-provider";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...rest }: ThemedViewProps) {
    const { colors } = useThemeContext();

    return <View style={[{ backgroundColor: colors.background }, style]} {...rest} />;
}
