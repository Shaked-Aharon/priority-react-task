type StateMessageProps = {
  title: string;
  message: string;
  tone?: "neutral" | "error";
  actionLabel?: string;
  onAction?: () => void;
};

export function StateMessage({
  title,
  message,
  tone = "neutral",
  actionLabel,
  onAction
}: StateMessageProps) {
  return (
    <div
      className={`state-message state-message--${tone}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
    >
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
