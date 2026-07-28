import type { Language, Messages } from "../i18n/messages";

type LanguageControlsProps = {
  value: Language;
  messages: Messages["language"];
  onChange: (value: Language) => void;
};

export function LanguageControls({ value, messages, onChange }: LanguageControlsProps) {
  return (
    <div className="language-controls" role="group" aria-label={messages.label}>
      <button type="button" aria-pressed={value === "en"} onClick={() => onChange("en")}>
        {messages.english}
      </button>
      <button type="button" aria-pressed={value === "he"} onClick={() => onChange("he")}>
        {messages.hebrew}
      </button>
    </div>
  );
}
