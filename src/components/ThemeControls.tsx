export type ThemePreference = "system" | "light" | "dark";

type ThemeControlsProps = {
  value: ThemePreference;
  onChange: (value: ThemePreference) => void;
};

export function ThemeControls({ value, onChange }: ThemeControlsProps) {
  return (
    <div className="theme-controls" role="group" aria-label="Theme preference">
      <button type="button" aria-pressed={value === "system"} onClick={() => onChange("system")}>
        System
      </button>
      <button type="button" aria-pressed={value === "light"} onClick={() => onChange("light")}>
        Light
      </button>
      <button type="button" aria-pressed={value === "dark"} onClick={() => onChange("dark")}>
        Dark
      </button>
    </div>
  );
}
