import type { Messages } from "../i18n/messages";

type PaginationControlsProps = {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLoading: boolean;
  messages: Messages["pagination"];
  onPrevious: () => void;
  onNext: () => void;
};

export function PaginationControls({
  canGoPrevious,
  canGoNext,
  isLoading,
  messages,
  onPrevious,
  onNext
}: PaginationControlsProps) {
  return (
    <nav className="pagination-controls" aria-label={messages.label}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={isLoading || !canGoPrevious}
        aria-label={messages.previousLabel}
      >
        {messages.previous}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={isLoading || !canGoNext}
        aria-label={messages.nextLabel}
      >
        {messages.next}
      </button>
    </nav>
  );
}
