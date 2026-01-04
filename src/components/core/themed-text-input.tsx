import { TextInput, type TextInputProps } from "react-native";
import { useThemeContext } from "../contexts/theme-provider";

export type ThemedTextInputProps = TextInputProps;

export function ThemedTextInput({ style, ...rest }: ThemedTextInputProps) {
    const { colors } = useThemeContext();

    return <TextInput style={[{ backgroundColor: colors.background, color: colors.foreground }, style]} {...rest} />;
}
