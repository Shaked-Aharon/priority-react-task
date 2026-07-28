import type { Messages } from "../i18n/messages";

export type ViewMode = "list" | "tile";

type ViewModeControlsProps = {
  value: ViewMode;
  disabled: boolean;
  messages: Messages["viewMode"];
  onChange: (value: ViewMode) => void;
};

export function ViewModeControls({ value, disabled, messages, onChange }: ViewModeControlsProps) {
  return (
    <div className="view-mode-controls" role="group" aria-label={messages.label}>
      <button
        type="button"
        aria-pressed={value === "list"}
        disabled={disabled}
        onClick={() => onChange("list")}
      >
        {messages.list}
      </button>
      <button
        type="button"
        aria-pressed={value === "tile"}
        disabled={disabled}
        onClick={() => onChange("tile")}
      >
        {messages.tile}
      </button>
    </div>
  );
}
