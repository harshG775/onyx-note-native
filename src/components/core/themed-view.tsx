import { View, type ViewProps } from "react-native";
import { useThemeContext } from "../contexts/theme-provider";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...rest }: ThemedViewProps) {
    const { colors } = useThemeContext();

    return <View style={[{ backgroundColor: colors.background }, style]} {...rest} />;
}
