import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ButtonProps as RNButtonProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { useThemeContext } from "../contexts/theme-provider";
import { useMemo } from "react";

type Variant = "default" | "secondary" | "destructive" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = RNButtonProps & {
    style?: StyleProp<ViewStyle>;
    icon?: keyof typeof MaterialIcons.glyphMap;
    variant?: Variant;
    size?: Size;
};

export default function Button({
    title,
    disabled,
    style,
    icon,
    variant = "default",
    size = "md",
    ...rest
}: ButtonProps) {
    const { colors, radius } = useThemeContext();

    const variantStyles = useMemo(() => {
        return {
            default: { backgroundColor: colors.primary, textColor: colors.primaryForeground, borderWidth: 0 },
            secondary: { backgroundColor: colors.secondary, textColor: colors.secondaryForeground, borderWidth: 0 },
            destructive: {
                backgroundColor: colors.destructive,
                textColor: colors.destructiveForeground,
                borderWidth: 0,
            },
            outline: {
                backgroundColor: "transparent",
                textColor: colors.foreground,
                borderWidth: 1,
                borderColor: colors.foreground,
            },
            ghost: { backgroundColor: "transparent", textColor: colors.foreground, borderWidth: 0 },
        }[variant];
    }, [variant, colors]);

    const sizeStyles = useMemo(() => {
        return {
            sm: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 34, textSize: 13, iconSize: 16 },
            md: { paddingHorizontal: 16, paddingVertical: 8, minHeight: 40, textSize: 15, iconSize: 18 },
            lg: { paddingHorizontal: 20, paddingVertical: 10, minHeight: 48, textSize: 17, iconSize: 20 },
        }[size];
    }, [size]);

    const rippleColor = useMemo(() => {
        return variant === "ghost" || variant === "outline"
            ? colors.foreground + "22"
            : colors.primaryForeground + "33";
    }, [variant, colors]);

    const isDisabled = !!disabled;

    return (
        <Pressable
            {...rest}
            disabled={isDisabled}
            android_ripple={{ color: rippleColor }}
            style={({ pressed }) => [
                {
                    backgroundColor: variantStyles.backgroundColor,
                    borderRadius: radius.md,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                    paddingVertical: sizeStyles.paddingVertical,
                    minHeight: sizeStyles.minHeight,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
                    borderWidth: variantStyles.borderWidth,
                    borderColor: variantStyles?.borderColor,
                },
                style,
            ]}
            accessibilityLabel={rest.accessibilityLabel || title}
            accessible
        >
            {icon && <MaterialIcons name={icon} size={sizeStyles.iconSize} color={variantStyles.textColor} />}
            <Text
                style={[
                    styles.text,
                    {
                        color: variantStyles.textColor,
                        fontSize: sizeStyles.textSize,
                    },
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: "500",
        textAlign: "center",
    },
});
