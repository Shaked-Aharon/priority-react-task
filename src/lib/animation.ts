const SELECTION_ANIMATION_MS = 260;
const SELECTION_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export function shouldReduceMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function animateSelection(sourceElement: HTMLElement, targetElement: HTMLElement): void {
  if (shouldReduceMotion()) {
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const clone = sourceElement.cloneNode(true) as HTMLElement;

  clone.classList.add("selection-flyout");
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;

  document.body.appendChild(clone);

  const deltaX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const deltaY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
  const scaleX = Math.max(targetRect.width / sourceRect.width, 0.2);
  const scaleY = Math.max(targetRect.height / sourceRect.height, 0.2);

  const animation = clone.animate(
    [
      { opacity: 0.9, transform: "translate3d(0, 0, 0) scale(1)" },
      {
        opacity: 0,
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${Math.min(scaleX, scaleY)})`
      }
    ],
    {
      duration: SELECTION_ANIMATION_MS,
      easing: SELECTION_EASING
    }
  );

  animation.addEventListener("finish", () => clone.remove(), { once: true });
  animation.addEventListener("cancel", () => clone.remove(), { once: true });
}
