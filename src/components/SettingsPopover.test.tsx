import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { messages } from "../i18n/messages";
import { SettingsPopover } from "./SettingsPopover";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("SettingsPopover", () => {
  it("opens a non-modal settings dialog and announces current values", () => {
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Settings" })).toHaveAttribute("aria-modal", "false");
    expect(screen.getByLabelText("Language")).toHaveValue("en");
    expect(screen.getByLabelText("Theme")).toHaveValue("system");
    expect(screen.getByLabelText("Language")).toHaveFocus();
  });

  it("changes language and theme through native controls", () => {
    const onLanguageChange = vi.fn();
    const onThemePreferenceChange = vi.fn();
    renderPopover({ onLanguageChange, onThemePreferenceChange });

    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "he" } });
    fireEvent.change(screen.getByLabelText("Theme"), { target: { value: "dark" } });

    expect(onLanguageChange).toHaveBeenCalledWith("he");
    expect(onThemePreferenceChange).toHaveBeenCalledWith("dark");
  });

  it("closes on Escape and returns focus to the trigger", () => {
    vi.useFakeTimers();
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByLabelText("Language"), { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Settings" })).not.toBeInTheDocument();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(trigger).toHaveFocus();
  });

  it("closes on outside pointer interaction and returns focus to the trigger", () => {
    vi.useFakeTimers();
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("dialog", { name: "Settings" })).not.toBeInTheDocument();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(trigger).toHaveFocus();
  });
});

type RenderPopoverOptions = {
  onLanguageChange?: (value: "en" | "he") => void;
  onThemePreferenceChange?: (value: "system" | "light" | "dark") => void;
};

function renderPopover({
  onLanguageChange = vi.fn(),
  onThemePreferenceChange = vi.fn()
}: RenderPopoverOptions = {}) {
  return render(
    <SettingsPopover
      language="en"
      themePreference="system"
      messages={messages.en.settings}
      onLanguageChange={onLanguageChange}
      onThemePreferenceChange={onThemePreferenceChange}
    />
  );
}
