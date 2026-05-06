import type { Config } from "tailwindcss";
import { tokens } from "./src/config/design.tokens";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: tokens.colors.bg,
        surface: tokens.colors.surface,
        text: tokens.colors.text,
        accent: tokens.colors.accent,
        status: tokens.colors.status,
        neutral: tokens.colors.neutral,
      },
      fontFamily: {
        display: [...tokens.typography.fontFamily.display],
        body: [...tokens.typography.fontFamily.body],
        mono: [...tokens.typography.fontFamily.mono],
      },
      fontSize: tokens.typography.fontSize,
      borderRadius: tokens.radii,
      boxShadow: tokens.shadow,
      spacing: tokens.spacing,
      backdropBlur: {
        soft: tokens.blur.soft,
        md: tokens.blur.md,
        lg: tokens.blur.lg,
      },
      maxWidth: {
        content: tokens.layout.contentWidth,
        shell: tokens.layout.maxWidth,
      },
    },
  },
  plugins: [],
};

export default config;
