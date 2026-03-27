import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        panel: "var(--panel)",
        panelAlt: "var(--panel-alt)",
        text: "var(--text-primary)",
        muted: "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        success: "var(--success)",
        danger: "var(--danger)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        shell: "0 20px 50px rgba(15, 23, 42, 0.08)",
        bubble: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
