/* Progressive enhancement: the HTML, SVGs and links are usable on their own. */
(() => {
  "use strict";
  const root = document.documentElement;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const button = document.querySelector(".motion-toggle");
  const label = button.querySelector(".motion-label");
  const icon = button.querySelector(".motion-icon");
  const cards = [...document.querySelectorAll(".project-card")];
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  const seen = new WeakSet();
  const revealAnimations = new Set();
  let userPaused = false;
  let observer;
  let pointerFrame = 0;
  let pointerSample;

  const motionPaused = () => userPaused || motionPreference.matches || document.hidden;

  function clearSpotlight(card) {
    card.removeAttribute("data-spotlight");
    card.style.removeProperty("--pointer-x");
    card.style.removeProperty("--pointer-y");
  }

  function stopPointer() {
    if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pointerSample = undefined;
    cards.forEach(clearSpotlight);
  }

  function configureMotion() {
    const paused = motionPaused();
    root.dataset.motion = paused ? "paused" : "active";
    button.hidden = motionPreference.matches;
    button.setAttribute("aria-pressed", String(userPaused));
    label.textContent = userPaused ? "Resume motion" : "Pause motion";
    icon.textContent = userPaused ? "▷" : "Ⅱ";
    if (observer) observer.disconnect();
    if (paused) {
      stopPointer();
      revealAnimations.forEach(animation => animation.cancel());
      revealAnimations.clear();
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || motionPaused()) continue;
        observer.unobserve(entry.target);
        if (seen.has(entry.target)) continue;
        seen.add(entry.target);
        if (typeof entry.target.animate !== "function") continue;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 540, easing: "cubic-bezier(.2,.65,.3,1)" }
        );
        revealAnimations.add(animation);
        const finished = () => revealAnimations.delete(animation);
        animation.onfinish = finished;
        animation.oncancel = finished;
      }
    }, { threshold: 0.08 });
    revealItems.forEach(item => { if (!seen.has(item)) observer.observe(item); });
  }

  cards.forEach(card => {
    card.addEventListener("pointermove", event => {
      if (motionPaused() || !finePointer.matches || event.pointerType === "touch") return;
      pointerSample = { card, x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!pointerSample || motionPaused()) return;
        const { card: current, x, y } = pointerSample;
        const bounds = current.getBoundingClientRect();
        current.style.setProperty("--pointer-x", `${x - bounds.left}px`);
        current.style.setProperty("--pointer-y", `${y - bounds.top}px`);
        current.dataset.spotlight = "active";
      });
    }, { passive: true });
    card.addEventListener("pointerleave", () => {
      if (pointerSample?.card === card) {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        pointerSample = undefined;
      }
      clearSpotlight(card);
    });
  });

  button.addEventListener("click", () => { userPaused = !userPaused; configureMotion(); });
  motionPreference.addEventListener("change", configureMotion);
  finePointer.addEventListener("change", stopPointer);
  document.addEventListener("visibilitychange", configureMotion);
  configureMotion();
})();
