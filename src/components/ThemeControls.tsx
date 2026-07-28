import type { Messages } from "../i18n/messages";

export type ThemePreference = "system" | "light" | "dark";

type ThemeControlsProps = {
  value: ThemePreference;
  messages: Messages["theme"];
  onChange: (value: ThemePreference) => void;
};

export function ThemeControls({ value, messages, onChange }: ThemeControlsProps) {
  return (
    <div className="theme-controls" role="group" aria-label={messages.label}>
      <button type="button" aria-pressed={value === "system"} onClick={() => onChange("system")}>
        {messages.system}
      </button>
      <button type="button" aria-pressed={value === "light"} onClick={() => onChange("light")}>
        {messages.light}
      </button>
      <button type="button" aria-pressed={value === "dark"} onClick={() => onChange("dark")}>
        {messages.dark}
      </button>
    </div>
  );
}
