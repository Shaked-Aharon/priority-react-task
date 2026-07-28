import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ThemePreference } from "../hooks/useEffectiveTheme";
import type { Language, Messages } from "../i18n/messages";

type SettingsPopoverProps = {
  language: Language;
  themePreference: ThemePreference;
  messages: Messages["settings"];
  onLanguageChange: (value: Language) => void;
  onThemePreferenceChange: (value: ThemePreference) => void;
};

export function SettingsPopover({
  language,
  themePreference,
  messages,
  onLanguageChange,
  onThemePreferenceChange
}: SettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const languageSelectRef = useRef<HTMLSelectElement>(null);
  const panelId = useId();
  const panelTitleId = useId();

  const closePopover = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    languageSelectRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        closePopover();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closePopover, isOpen]);

  return (
    <div className="settings-popover">
      <button
        ref={triggerRef}
        type="button"
        className="settings-popover__trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        {messages.trigger}
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          id={panelId}
          className="settings-popover__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby={panelTitleId}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              closePopover();
            }
          }}
        >
          <div className="settings-popover__header">
            <h2 id={panelTitleId}>{messages.title}</h2>
            <button type="button" className="settings-popover__close" onClick={closePopover}>
              {messages.close}
            </button>
          </div>

          <label className="settings-popover__field">
            <span>{messages.languageLabel}</span>
            <select
              ref={languageSelectRef}
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as Language)}
            >
              <option value="en">{messages.english}</option>
              <option value="he">{messages.hebrew}</option>
            </select>
          </label>

          <label className="settings-popover__field">
            <span>{messages.themeLabel}</span>
            <select
              value={themePreference}
              onChange={(event) => onThemePreferenceChange(event.target.value as ThemePreference)}
            >
              <option value="system">{messages.system}</option>
              <option value="light">{messages.light}</option>
              <option value="dark">{messages.dark}</option>
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}
