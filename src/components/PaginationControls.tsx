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
      <button type="button" onClick={onPrevious} disabled={isLoading || !canGoPrevious}>
        Previous
      </button>
      <button type="button" onClick={onNext} disabled={isLoading || !canGoNext}>
        Next
      </button>
    </nav>
  );
}
