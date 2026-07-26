export type ViewMode = "list" | "tile";

type ViewModeControlsProps = {
  value: ViewMode;
  disabled: boolean;
  onChange: (value: ViewMode) => void;
};

export function ViewModeControls({ value, disabled, onChange }: ViewModeControlsProps) {
  return (
    <div className="view-mode-controls" role="group" aria-label="Result view mode">
      <button
        type="button"
        aria-pressed={value === "list"}
        disabled={disabled}
        onClick={() => onChange("list")}
      >
        List
      </button>
      <button
        type="button"
        aria-pressed={value === "tile"}
        disabled={disabled}
        onClick={() => onChange("tile")}
      >
        Tile
      </button>
    </div>
  );
}
