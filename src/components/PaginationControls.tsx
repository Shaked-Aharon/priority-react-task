type PaginationControlsProps = {
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function PaginationControls({
  canGoPrevious,
  canGoNext,
  isLoading,
  onPrevious,
  onNext
}: PaginationControlsProps) {
  return (
    <nav className="pagination-controls" aria-label="Search result pages">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isLoading || !canGoPrevious}
        aria-label="Load previous result page"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={isLoading || !canGoNext}
        aria-label="Load next result page"
      >
        Next
      </button>
    </nav>
  );
}
