/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// constants/global-theme.ts
import { Platform } from "react-native";

const BASE_RADIUS = 12;
//
export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
} as const;

export const RADIUS = {
    xs: BASE_RADIUS - 6,
    sm: BASE_RADIUS - 4,
    md: BASE_RADIUS - 2,
    lg: BASE_RADIUS,
    xl: BASE_RADIUS + 4,
    "2xl": BASE_RADIUS + 8,
} as const;

export const COLORS = {
    light: {
        primary: "hsl(226 70% 55%)",
        primaryForeground: "hsl(0 0% 100%)",

        background: "hsl(0 0% 100%)",
        foreground: "hsl(222 47% 11%)",

        card: "hsl(0 0% 99.2157%)",
        cardForeground: "hsl(0 0% 0%)",

        secondary: "hsl(226 64% 95%)",
        secondaryForeground: "hsl(226 50% 30%)",

        muted: "hsl(226 40% 96%)",
        mutedForeground: "hsl(226 30% 40%)",

        destructive: "hsl(0 84% 60%)",
        destructiveForeground: "hsl(0 0% 98%)",

        warning: "hsl(48 96% 53%)",
        warningForeground: "hsl(222 47% 11%)",

        success: "hsl(142 71% 45%)",
        successForeground: "hsl(0 0% 100%)",

        border: "hsl(240 17.0732% 91.9608%)",
    },

    dark: {
        primary: "hsl(226 70% 65%)",
        primaryForeground: "hsl(222 47% 10%)",

        background: "hsl(222 47% 5%)",
        foreground: "hsl(0 0% 98%)",

        card: "hsl(228.0000 6.8493% 14.3137%)",
        cardForeground: "hsl(0 0% 94.1176%)",

        secondary: "hsl(226 30% 20%)",
        secondaryForeground: "hsl(226 70% 85%)",

        muted: "hsl(226 30% 15%)",
        mutedForeground: "hsl(226 30% 80%)",

        destructive: "hsl(0 62% 48%)",
        destructiveForeground: "hsl(0 0% 100%)",

        warning: "hsl(48 96% 53%)",
        warningForeground: "hsl(222 47% 11%)",

        success: "hsl(142 71% 45%)",
        successForeground: "hsl(0 0% 100%)",

        border: "hsl(222.8571 6.4220% 21.3725%)",
    },
} as const;

export const FONTS = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: "system-ui",
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: "ui-serif",
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: "ui-rounded",
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: "ui-monospace",
    },
    default: {
        sans: "normal",
        serif: "serif",
        rounded: "normal",
        mono: "monospace",
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
} as const);
